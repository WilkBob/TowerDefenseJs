import { global } from "../main"
import { UI } from "../UI/UI";
import { Player } from "./Player";
import { Tower } from "./tower";
export class Game{
    constructor(){
        this.objects = {
            towers: [],
            bullets: [],
            enemies: []
        }

        
        this.player = new Player(global.playerDefinition);
        this.player.load();

        this.level = global.levelDefinitions[`level${this.player.progress.level}`];

        this.background = new Image();
        this.background.src = this.level.background;
        this.background.onload = () => {
            this.loaded = true;
        }

        this.ui = new UI();
    }


    update(){
        this.objects.towers.forEach(tower => {
            tower.update();
        });

        this.objects.enemies.forEach(enemy => {
            enemy.update();
        });

        this.objects.bullets.forEach(bullet => {
            bullet.update();
        });

        this.ui.update();
    }

    draw(){
        
        global.ctx.drawImage(this.background, 0, 0, global.canvas.width, global.canvas.height);
        
        this.objects.towers.forEach(tower => {
            tower.draw();
        });

        this.objects.enemies.forEach(enemy => {
            enemy.draw();
        });

        this.objects.bullets.forEach(bullet => {
            bullet.draw();
        });

        this.ui.draw();

        
    }


    addTower(x, y, definition){
        const tower = new Tower(mouse, definition, this);
        this.objects.towers.push(tower);
    }
}