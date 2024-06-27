import { global } from "../../main.js";
import { Bullet } from "./Bullet";

export class Tower{
    constructor(pos, definition, main){
        this.main = main;
        this.x = pos.x;
        this.y = pos.y;
        this.definition = definition;
        this.ctx = global.ctx;
        this.size = 50;
        this.range = this.definition.range;
        this.damage = this.definition.damage;
        this.fireRate = this.definition.fireRate;
        this.rotation = 0;
        this.target = null;
        this.frame = 1;
        this.image = new Image();
        this.image.src = this.definition.spritesheet.src;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
        };
        this.isMouseOver = false;

        // Store interval IDs
        this.frameInterval = setInterval(() => {
            this.frame = (this.frame + 1)
            if(this.frame >= this.definition.spritesheet.frames){
                this.frame = 1;
            }
        }, 1000/this.definition.spritesheet.frames);

        this.shootInterval = setInterval(() => {
            if(this.target && global.game.loaded &&!global.game.paused){
                this.shoot();
            }
        }, this.fireRate);
        this.shoot();

    }

    shoot(){
        if(this.target){
            this.main.objects.bullets.push(new Bullet(this.ctx, this, this.target));
            console.log(this.main.objects.bullets);
        }
    }

    draw(){
        if(!this.loaded){
            return;
        }
        const framesPerRow = 12;
        const frameWidth = 128;
        const frameHeight = 128;
    
        const row = Math.floor(this.frame / framesPerRow);
        const column = this.frame % framesPerRow;
    
        const sx = column * frameWidth;
        const sy = row * frameHeight;
    
        this.ctx.save();
    
        this.ctx.translate(this.x * global.size, this.y * global.size);
    
        this.ctx.rotate(this.rotation);
    
        const adjustedSize = this.size * global.fac * this.definition.spritesheet.fac;
    
        this.ctx.drawImage(
            this.image,
            sx,
            sy,
            frameWidth,
            frameHeight,
            -adjustedSize / 2,
            -adjustedSize / 2,
            adjustedSize,
            adjustedSize
        );
    
        this.ctx.restore();
    }

    checkMouseOver(){
        const x = global.mouse.x * global.size;
        const y = global.mouse.y * global.size;
        const dx = x - this.x * global.size;
        const dy = y - this.y * global.size;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.isMouseOver = distance < this.size * global.fac;
    }
 findFirstEnemyWithinRange(tower, enemies) {
    return enemies.find(enemy => {
        const dx = enemy.x - tower.x;
        const dy = enemy.y - tower.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < tower.range;
    });
}



    findClosestEnemyWithinRange(tower, enemies) {
    let closestEnemy = null;
    let shortestDistance = Infinity;

    enemies.forEach(enemy => {
        const dx = enemy.x - tower.x;
        const dy = enemy.y - tower.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < tower.range && distance < shortestDistance) {
            closestEnemy = enemy;
            shortestDistance = distance;
        }
    });

    return closestEnemy;
}


   update() {
    this.checkMouseOver();

    if (this.target) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.rotation = Math.atan2(dy, dx) - Math.PI / 2;
        if (distance > this.range * global.fac || this.target.dead || this.target.health <= 0) {
            this.target = null;
        }
    } else {
        if (this.main.objects.enemies.length === 0) {
            return;
        }
        // Choose the target-finding method here
        this.target = this.findFirstEnemyWithinRange(this, this.main.objects.enemies);
        // this.target = this.findClosestEnemyWithinRange(this, this.main.objects.enemies);
    }
}

    // Method to clear intervals
    clearIntervals() {
        clearInterval(this.frameInterval);
        clearInterval(this.shootInterval);
    }
}