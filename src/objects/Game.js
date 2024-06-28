import { global } from "../../main.js"
import { UI } from "../UI/UI";
import { Clickmask } from "./Clickmask";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Tower } from "./tower";
import Splash from '@images/splash.png';
export class Game{
    constructor(){
        this.objects = {
            towers: [],
            bullets: [],
            enemies: [],
            spritesheets: []
        }
        this.paused = true;
        this.loaded = false;

        
        this.player = new Player(global.playerDefinition);
        this.player.load();

        this.level = global.levelDefinitions.level1;

        this.background = new Image();
        this.background.src = Splash
        this.background.onload = () => {
            this.loaded = true;
            this.addMessage('Level loaded', 'Game');

        }

        this.clickmask= new Clickmask(this.level.mask);
        this.ui = new UI();
        this.selectedTower = null;

    }

    update(){
       
        if(!this.loaded){
            return;
        }
        this.ui.update();
        this.ui.draw();
        if(this.paused){
            return;
        }

        this.objects.towers.forEach(tower => {
            tower.update();
            tower.draw();
        });

        this.objects.enemies.forEach(enemy => {
            enemy.update();
            enemy.draw();
        });

        this.objects.bullets.forEach(bullet => {
            bullet.update();
            bullet.draw();

            if(bullet.toRemove){
                this.objects.bullets.splice(this.objects.bullets.indexOf(bullet), 1);
            }
        }); 
        
        

       

        
    }


    draw(){
        
        if(!this.loaded){
            return;
        }
        global.ctx.drawImage(this.background, 0, 0, global.canvas.width, global.canvas.height);
        this.objects.spritesheets.forEach(spritesheet => {
            spritesheet.draw();
            if(spritesheet.frame === spritesheet.frames){
                this.objects.spritesheets.splice(this.objects.spritesheets.indexOf(spritesheet), 1);
            }
        }
        );

       

    }

    loadBackground(src){
        this.loaded = false;
        this.background.src = src;
        this.background.onload = () => {
            this.loaded = true;
        }
    }

    

    addTower(x, y, definition){
        if(this.player.money < definition.cost){
            this.addMessage('Not enough money', 'Player');
            return;
        }
        const tower = new Tower({x: x, y: y}, definition, this);
        this.objects.towers.push(tower);
        this.player.removeMoney(definition.cost);
        this.addMessage(`Placed ${definition.name}`, `${this.player.name}`);
    }

    addEnemy(path, key){
        const enemy = new Enemy(path, global.enemyDefinitions[key], this);
        this.objects.enemies.push(enemy);
    }

    addMessage(message, sender){
        const time = new Date();

        this.ui.state.messages.push(`${
            time.getHours().toString().padStart(2, '0')}:${
            time.getMinutes().toString().padStart(2, '0')}:${
            time.getSeconds().toString().padStart(2, '0')} - ${sender}: ${message}`);
    }



    click(){
        console.log('click');
        if(this.paused){
            return;
        }
        if(!this.selectedTower){
            this.addMessage('No tower selected', 'Game');
            return;
        }
        if(global.mouse.canPlace && this.loaded){
            this.addTower(global.mouse.x, global.mouse.y, global.towerDefinitions[this.selectedTower]);
        }else{
            this.addMessage('Cannot place tower here', 'Game');
        }
    }

    start(){
        this.loadBackground(this.level.background);
        this.ui.start();
        this.paused = false;
        this.addMessage('Game started', 'Game');
      
    }

    pause(){
        this.paused = true;
        this.ui.pause();
    }

    unpause(){
        this.paused = false;
        this.ui.unpause();
    }

    gameOver(){
        this.paused = true;
        this.loaded = false;
        this.ui.gameOver();
        this.objects.towers.forEach(tower => {
            clearInterval(tower.frameInterval);
            clearInterval(tower.shootInterval);
        });
        this.objects = {
            towers: [],
            bullets: [],
            enemies: [],
            spritesheets: [],
        }
        this.player.save();
        this.player.health = this.player.maxHealth;
        this.player.money = this.player.startingMoney;
        this.loadBackground(Splash);
        this.addMessage('Game over', 'Game');
    }



    
}