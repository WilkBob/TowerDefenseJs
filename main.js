import '/style.css'
import bg from '/images/bg.png';
import clickMask from '/images/level1mask.png';
import { levelDefinitions } from './definitions/Levels';
import { enemyDefinitions } from './definitions/enemies';
import { towerDefinitions } from './definitions/towers';
import { Enemy } from './objects/enemy';
import { Tower } from './objects/tower';
import { SpriteSheet } from './objects/spritesheet';
import { healthBar } from './ui/healthbar';

const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

export const global = {
  canvas,
  ctx,
  size: canvas.height,
  fac: canvas.height / 1024,
  fps: {
    frames: 0,
    fps: null
  },
  mouse: {
    x:null,
    y:null,
    radius:10,
    color: 'rgba(255,255,255,0.5)',
    down: false,
    lastClick: null,
    canPlaceTower: true,
  },
  ui:{
    startButton:null,
    restartButton:null,
    healthBar:null,
    moneyBar:null,
    waveCounter:null,
    scoreCounter:null,
    towerButtons:[],
    zombieButtons:[],
  },
  levelDefinitions,
  enemyDefinitions,
  towerDefinitions,
  messageHistory:[],
  game:null,

}
//tower defense game main class
class main {
  constructor() {
    this.loop = this.loop.bind(this);
    this.objects={
      enemies:[],
      towers:[],
      bullets:[],
      sprites:[],
      messages:[],
    };
    this.player = {
      health: 100,
      money: 450,
      score: 0,
      wave: 1,
      selectedTower: null,
    };
   
    this.bg = null;
    this.mask = null;
    this.maskCanvas = null;
    this.maskCtx = null;

    this.loaded = false;
  
    this.levelIndex = 0;
    this.level = levelDefinitions['level1'];
    this.zombie = enemyDefinitions['zombie'];
    this.playing = false;

    this.waiting = true;
    this.animationId = null;
    

    //EVENT LISTENERS

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      global.mouse.x = (e.clientX - rect.left) / global.size;
      global.mouse.y = (e.clientY - rect.top) / global.size;
    });
    
    canvas.addEventListener('mousedown', (e) => {
      global.mouse.down = true;
      global.mouse.lastClick = {
        x: global.mouse.x,
        y: global.mouse.y,
      };
      global.mouse.color = 'rgba(245,255,245,.8)';
      global.mouse.radius = 20;
       this.addTower(global.mouse.lastClick, towerDefinitions['shooter']);

    });
    
    canvas.addEventListener('mouseup', (e) => {
      global.mouse.down = false;
      global.mouse.color = 'rgba(255,255,255,0.5)';
      global.mouse.radius = 10;
    });

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    }

    //UI AND MISC

    generateStartButton(){
      const startButton = document.createElement('button');
       startButton.innerHTML = 'Start Game';
       startButton.classList.add('startButton');
       startButton.onclick = ()=>{
         this.init();
         startButton.style.display = 'none';
       }
       document.body.appendChild(startButton);
       global.ui.startButton = startButton;
      
     }
     
   generateAddzombieButton() {
  const container = document.createElement('div');
  container.classList.add('zombieButtonsContainer');

  const button1 = document.createElement('button');
  button1.innerHTML = 'path1';
  button1.classList.add('addzombieButton');
  button1.onclick = () => {
    this.addEnemy(1, enemyDefinitions.zombie);
  };

  const button2 = document.createElement('button');
  button2.innerHTML = 'path2';
  button2.classList.add('addzombieButton');
  button2.onclick = () => {
    this.addEnemy(2, enemyDefinitions.zombie);
  };

  const bigZombieButton = document.createElement('button');
  bigZombieButton.innerHTML = 'Big Zombie';
  bigZombieButton.classList.add('addzombieButton');
  bigZombieButton.onclick = () => {
    this.addEnemy(2, enemyDefinitions.bigZombie);
  };

  const killEnemyButton = document.createElement('button');
  killEnemyButton.innerHTML = 'Kill Enemy';
  killEnemyButton.classList.add('addzombieButton');
  killEnemyButton.onclick = () => {
    if (this.objects.enemies.length > 0) {
      this.removezombie(this.objects.enemies[0], true);
    }};

    const waveButton = document.createElement('button');
    waveButton.innerHTML = 'Spawn Wave';
    waveButton.classList.add('addzombieButton');
    waveButton.onclick = () => {
      if (this.player.wave >= this.level.waves.length) {
        addMessage('No more waves', 'Game');
        return;
      }
      this.spawnWave(this.level.waves[this.player.wave]);
      
      this.player.wave++;
      addMessage(`Wave ${this.player.wave} incoming`, 'Game');
    };



  container.appendChild(button1);
  container.appendChild(button2);
  container.appendChild(killEnemyButton);
  container.appendChild(bigZombieButton);
  container.appendChild(waveButton);
  document.body.appendChild(container);

  global.ui.zombieButtons.push(container);
}

checkClick() {
  if (!this.loaded) {
    return false; // Early exit if not loaded
  }

  // Check if the mouse is on any tower
 

 

  // Get pixel color under mouse
  const x = Math.floor(global.mouse.x * global.size);
  const y = Math.floor(global.mouse.y * global.size);
  const pixel = this.maskCtx.getImageData(x, y, 1, 1).data;

  // Check if the pixel is white (assuming white is clickable)
  if (pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255) {
    return true; // White pixel, clickable area
  }

  return false; // Black pixel or any other color, not clickable
}
  drawMouse(){
        // Check if the game is loaded, if not, exit the function
        if(!this.loaded){
          return;
        }
        // Check if the mouse position is null (not on canvas), if so, exit the function
        if(global.mouse.x === null || global.mouse.y === null){
          return;
        }
        // Determine if a tower can be placed based on the current mouse position
        global.mouse.canPlaceTower = this.checkClick();
        // Set the fill color based on whether a tower can be placed
        ctx.fillStyle = global.mouse.canPlaceTower ? global.mouse.color : 'rgba(255,0,0,0.5)';
        // Begin drawing the circle that follows the mouse cursor
        ctx.beginPath();
        ctx.arc(global.mouse.x*global.size, global.mouse.y*global.size, global.mouse.radius, 0, Math.PI*2);
        ctx.fill();
        // Close the path to complete the drawing
        ctx.closePath();
    }

    drawFPS(){
      // Increment the frame count
      global.fps.frames++;
      // Set the font color and style for the FPS counter
      global.ctx.fillStyle = 'white';
      global.ctx.font = '20px Arial';
      // If the FPS value is calculated, display it on the canvas
      if(global.fps.fps !== null){
      global.ctx.fillText(`FPS: ${global.fps.fps}`, global.size - 80, global.size - 10);
    }
  }

  drawMessages(){
    // Check if there are any messages to display
    if(this.objects.messages.length>0){
      const totalMessages = this.objects.messages.length;
      // Loop through each message
      this.objects.messages.forEach((message, index) => {
        // Calculate alpha to make newer messages darker
        let alpha = 1 - ((totalMessages - index - 1) / totalMessages * 0.8);
        // Set the font color with calculated alpha for fade effect
        global.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        // Set the font size and style
        global.ctx.font = `${20 * global.fac}px Arial`;
        // Adjust Y position so higher index (newer) messages are at the bottom
        global.ctx.fillText(message, 10, global.size - 50 - (totalMessages - index - 1) * 30 * global.fac);
      });
    }
  }
  drawHealthBar(){
    global.ui.healthBar.draw(this.player.health);
  }

 drawUI(){
    global.ctx.fillStyle = 'white';
    global.ctx.font = `${20 * global.fac}px Arial`;
    
    // Adjust text positioning according to global.fac
    global.ctx.fillText(`Money: ${this.player.money}`, (global.size - 200) * global.fac, 60 * global.fac);
    global.ctx.fillText(`Wave: ${this.player.wave}`, (global.size - 200) * global.fac, 90 * global.fac);

    
    this.drawFPS();
    this.drawMouse();
    this.drawMessages();
    this.drawHealthBar();
  }




     //ENEMIES

      //add enemy to game

  addEnemy(pathIndex, definition){
    const enemy = new Enemy(this.level[`path${pathIndex}`], definition, ctx, this);
    this.objects.enemies.push(enemy);
    }

  
  //remove enemy from game
  removezombie(enemy, message){
    const pos = {x: enemy.x, y: enemy.y, rotation: enemy.rotation};
    
    this.objects.sprites.push(new SpriteSheet(enemy.deathAnimation.src, enemy.deathAnimation.size, enemy.deathAnimation.frames / 2, pos, enemy.definition.spritesheet.fac));
    enemy.clearIntervals();
    this.objects.enemies = this.objects.enemies.filter((e)=>e!==enemy);
    if(message){
    addMessage(enemy.definition.messages.death[Math.floor(Math.random() * enemy.definition.messages.death.length)], enemy.definition.name);
}
  }

  spawnWave(wave){
    wave.path1.forEach((waveEnemy)=>{
      for(let i = 0; i < waveEnemy.count; i++){
        setTimeout(()=>{
          this.addEnemy(1, enemyDefinitions[waveEnemy.enemy]);
        }, waveEnemy.interval * i);
      }
    });
    wave.path2.forEach((enemy)=>{
      for(let i = 0; i < enemy.count; i++){
        setTimeout(()=>{
          this.addEnemy(2, enemyDefinitions[enemy.enemy]);
        }, enemy.interval * i);
      }
    });
  }


  //TOWERS
addTower(pos, definition){
  if(this.player.money < definition.cost){
    addMessage('Not enough money', 'Game');
    return;
  }
  if(!global.mouse.canPlaceTower){
    addMessage('Cannot place tower here', 'Game');
    return;
  }


  this.player.money -= definition.cost;
  console.log(this.player.money, definition.cost, 'money spent');
  const tower = new Tower(pos, definition, this);
  this.objects.towers.push(tower);
}


  //ESSENTIAL FUNCTIONS



    resize() {
      // Calculate the size of the largest square that can fit in the window
      const size = Math.min(window.innerWidth, window.innerHeight);
      global.canvas.width = size;
      global.canvas.height = size;
      global.size = size;
      global.fac = size / 1024;

      // Re-acquire the context in case of context properties reset after resize
      global.ctx = global.canvas.getContext('2d');
    if(this.loaded){
      this.maskCanvas.width = size;
      this.maskCanvas.height = size;
      this.maskCtx.clearRect(0, 0, size, size);
      this.maskCtx.drawImage(this.mask, 0, 0, size, size);
    }
      // Redraw the canvas content after resizing
      this.draw();
    }

      //update game objects
      update() {
        if(this.objects.enemies.length>0){
          this.objects.enemies.forEach((enemy)=>{
          enemy.draw(); enemy.update();
          });
        }
        if(this.objects.towers.length>0){
          this.objects.towers.forEach((tower)=>{
            tower.update();
            tower.draw();
          });
        }
        
          this.objects.bullets.forEach((bullet)=>{
            
            bullet.draw();
            bullet.update();
            if(bullet.toRemove){
              this.objects.bullets = this.objects.bullets.filter((b)=>b!==bullet);
            }
          });
        
        if(this.objects.sprites.length>0){
          this.objects.sprites.forEach((sprite)=>{
            sprite.draw();
            if(sprite.frame>=sprite.frames-1){
              this.objects.sprites = this.objects.sprites.filter((s)=>s!==sprite);
            }
          });
        }
      }

      load(){
        if(!this.loaded){
          this.bg = new Image();
          this.bg.src = bg;
          this.bg.onload = ()=>{
            this.generateStartButton();
            this.loaded = true;
            this.draw();
            }
          this.mask = new Image();
          this.mask.src = clickMask;
          this.mask.onload = ()=>{
            this.maskCanvas = document.createElement('canvas');
            this.maskCanvas.width = global.size;
            this.maskCanvas.height = global.size;
            this.maskCtx = this.maskCanvas.getContext('2d', {willReadFrequently: true});
            this.maskCtx.drawImage(this.mask, 0, 0, global.size, global.size);

            
        }
      }
    }


      draw(){
        ctx.clearRect(0, 0, global.size, global.size);
        if(this.loaded){
          //draw background
          global.ctx.drawImage(this.bg, 0, 0, global.size, global.size);
        }
        
    }




    loop() {
      this.draw();
      this.update();
      this.drawUI();
      
       
      
      
      this.animationId = requestAnimationFrame(this.loop.bind(this));
    }

init() {
  if(this.objects.towers.length>0){
    this.objects.towers.forEach((tower)=>{
      tower.clearIntervals();
    })};

    if(this.objects.enemies.length>0){
      this.objects.enemies.forEach((enemy)=>{
        enemy.clearIntervals();
      });
    }

  this.objects = {
    enemies: [],
    towers: [],
    bullets: [],
    sprites: [],
    messages: [],
  };

  global.ui = global.ui || {};
  global.ui.startButton = global.ui.startButton || null;
  global.ui.restartButton = global.ui.restartButton || null;
  global.ui.zombieButtons = global.ui.zombieButtons || [];

  this.player = {
    health: 100,
    money: 450,
    score: 0,
    wave: 0,
    selectedTower: null,
  };

  this.levelIndex = 0;
  this.level = global.levelDefinitions ? global.levelDefinitions['level1'] : undefined;
  this.zombie = enemyDefinitions ? enemyDefinitions['zombie'] : undefined;

  if (!global.ui.healthBar) {
    global.ui.healthBar = new healthBar(10, 10, 200, 20, this.player.health);
  }
  if (global.ui.zombieButtons.length === 0) {
    this.generateAddzombieButton();
  }


  this.playing = true;
  this.waiting = true;
  if(!this.animationId){
    this.loop();
  }
}}
const game = new main();
game.load();
global.game = game;

setInterval(() => {
  global.fps.fps = global.fps.frames;
  global.fps.frames = 0;
}, 1000);

export function addMessage(message, sender){
  if(game.objects.messages.length>=5){
    global.messageHistory.push(game.objects.messages.shift());
  }
  game.objects.messages.push(`${
    new Date().toLocaleTimeString()
  } -${sender}: ${message}`);

}

export function killEnemy(enemy){
  game.removezombie(enemy);
}

