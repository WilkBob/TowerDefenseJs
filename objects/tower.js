import { global } from "../main";
import { Bullet } from "./bullet";

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

        // Store interval IDs
        this.frameInterval = setInterval(() => {
            this.frame = (this.frame + 1)
            if(this.frame >= this.definition.spritesheet.frames){
                this.frame = 1;
            }
        }, 1000/this.definition.spritesheet.frames);

        this.shootInterval = setInterval(() => {
            if(this.target){
                this.shoot();
            }
        }, this.fireRate);
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

    update(){
        if(this.target){
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            this.rotation = Math.atan2(dy, dx) - Math.PI / 2;
            if(distance > this.range * global.fac || this.target.dead || this.target.health <= 0){
                this.target = null;
            }
        }else{
            if(this.main.objects.enemies.length === 0){
                return;
            }
            this.target = this.main.objects.enemies.find(enemy => {
                const dx = enemy.x - this.x;
                const dy = enemy.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return distance < this.range;
            });
        }
    }

    // Method to clear intervals
    clearIntervals() {
        clearInterval(this.frameInterval);
        clearInterval(this.shootInterval);
    }
}