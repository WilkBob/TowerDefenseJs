import { global } from "../../main.js"
import { UI } from "../UI/UI";
import { Clickmask } from "./Clickmask";
import { Enemy } from "./Enemy";
import { GameStateController } from "./GameStateController.js";
import { LevelController } from "./LevelController";
import { Player } from "./Player";
import { Tower } from "./tower";
import Splash from '/images/splash.png';
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
        this.level = global.levelDefinitions[`level1`];
        
        this.player = new Player(global.playerDefinition);
        this.player.load();
        this.levelcontroller = new LevelController(this.player,  this.level);
        console.log('about to make ui');
        this.ui = new UI();
        console.log('ui made');
        this.background = new Image();
        this.background.src = Splash
        this.background.onload = () => {
            this.loaded = true;

        }

        
        
        this.selectedTower = null;
        this.statecontroller = new GameStateController()
        this.levelcontroller.init();
        console.log(this.level, this.levelcontroller.level, this.level === this.levelcontroller.level);
        this.clickmask= new Clickmask(this.level.mask);
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
            this.ui.messages.addMessage('Not enough money', 'Player');
            return;
        }
        const tower = new Tower({x: x, y: y}, definition, this);
        this.objects.towers.push(tower);
        this.player.removeMoney(definition.cost);
        this.ui.messages.addMessage(`Placed ${definition.name}`, `${this.player.name}`);
    }

    addEnemy(path, key){
        const enemy = new Enemy(path, global.enemyDefinitions[key], this);
        this.objects.enemies.push(enemy);
    }




    



    
}