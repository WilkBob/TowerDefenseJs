import '/style.css'


import { levelDefinitions } from './src/definitions/levels';
import { enemyDefinitions } from './src/definitions/enemies';
import { towerDefinitions } from './src/definitions/towers';
import { playerDefinition } from './src/definitions/newplayer';
import { Game } from './src/objects/Game';


const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

export const global = {
  canvas,
  ctx,
  size: null,
  baseSize: 1024,
  fac: null,
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
    canPlace: false
  },
  levelDefinitions,
  enemyDefinitions,
  towerDefinitions,
  playerDefinition,
  messageHistory:[],
  game:null,

}







//EventListeners
global.canvas.addEventListener('mousemove', (e) => {
  const rect = global.canvas.getBoundingClientRect();
  global.mouse.x = (e.clientX - rect.left) / global.size;
  global.mouse.y = (e.clientY - rect.top) / global.size;
});

global.canvas.addEventListener('mousedown', (e) => {
  global.mouse.down = true;
}
);

global.canvas.addEventListener('mouseup', (e) => {
  global.mouse.down = false;
});

global.canvas.addEventListener('click', (e) => {
  global.game.statecontroller.click(global.mouse.x, global.mouse.y);
});

window.addEventListener('resize', resize);
//Resize canvas
function resize(){
  //biggest possible square given the window size
  const size = Math.min(window.innerWidth, window.innerHeight);
  global.canvas.width = size;
  global.canvas.height = size;
  global.size = size;
  global.fac = size / global.baseSize;
  document.documentElement.style.setProperty('--canvas-fac', global.fac);
  document.documentElement.style.setProperty('--canvas-size', global.size + 'px');

  if(global.game){
    global.game.clickmask.resize();
  }
}


window.addEventListener('keydown', (e) => {
  if(e.key === '1'){
    global.game.selectedTower = 'shooter';
    const towerCard = document.getElementById('shooter');
    document.querySelectorAll('.towerCard').forEach(card => card.classList.remove('active'));
    towerCard.classList.add('active');

  } 
  
  if(e.key === '2'){
    global.game.selectedTower = 'sprayer';
    const towerCard = document.getElementById('sprayer');
    document.querySelectorAll('.towerCard').forEach(card => card.classList.remove('active'));
    towerCard.classList.add('active');
  }

  if(e.key === 'm'){
    global.game.player.addMoney(100);
  }
  if(e.key === 'h'){
    global.game.player.addHealth(100);
  }

  if(e.key === 's'){
    global.game.levelcontroller.spawnWave();
  }

  if(e.key === 'escape' && global.game.paused === false && global.game.loaded){
    global.game.statecontroller.pause();
  }
});


setInterval(() => {
  global.fps.fps = global.fps.frames;
  global.fps.frames = 0;
}, 1000);



function startGame(){
  resize();
  global.game = new Game();
  global.loop = loop();
}

function loop(){
  global.ctx.clearRect(0,0,global.canvas.width,global.canvas.height);
  global.game.draw();
  global.game.update();
  global.game.ui.drawMouse();
  
  global.fps.frames++;
  return requestAnimationFrame(loop);
}

startGame();
