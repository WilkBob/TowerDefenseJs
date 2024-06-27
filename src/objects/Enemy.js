
import { global } from '../../main.js';
import { SpriteSheet } from './SpriteSheet.js';

export class Enemy{
    constructor(path, definition){
        this.path = path;
        this.pathIndex = 0;
        this.definition = definition;
        this.ctx = global.ctx;
        this.x = path[0].x;
        this.y = path[0].y;
        this.rotation = 0;
        this.dead = false;
        this.size = this.definition.size;
        this.speed = this.definition.speed;
        this.health = this.definition.health;
        this.reward = this.definition.reward;
        this.damage = this.definition.damage;
        this.frame = 0;
        this.dead = false;
        this.animation = this.definition.spritesheet;
        this.deathAnimation = this.definition.animations.death;
        this.messages = this.definition.messages;
        this.currentMessage = this.messages.spawn[Math.floor(Math.random() * this.messages.spawn.length)];
        this.image = new Image();
        this.image.src = this.animation.src;
        this.player = global.game.player;
        this.loaded = false;
        this.paused = false;
        this.animInterval = setInterval(() => {
            this.frame = (this.frame + 1)
            if(this.frame >= this.animation.frames){
                this.frame = 0;
            }
        }, 1000/this.animation.frames);


        this.image.onload = () => {
            this.loaded = true;
        }
        


        global.game.addMessage(this.currentMessage, this.definition.name);
    }

    drawHealthBar(){
    // Decrease the width by reducing the multiplier or subtracting a fixed value
    const healthBarWidth = this.size * global.fac * 0.8; // Example: 80% of the original width
    // Increase the height by increasing its value
    const healthBarHeight = 10; // Increased from 5 to 10

    const healthBarX = this.x * global.size - healthBarWidth / 2;
    const healthBarY = this.y * global.size - this.size * global.fac / 2 - 10;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(healthBarX, healthBarY, healthBarWidth * (this.health / this.definition.health), healthBarHeight);
}

    draw(){
        if(!this.loaded){
            return;
        }
        this.drawHealthBar();
        const framesPerRow = 12;
        const frameWidth = 128;
        const frameHeight = 128;
    
        // Calculate row and column based on the current frame
        const row = Math.floor(this.frame / framesPerRow);
        const column = this.frame % framesPerRow;
    
        // Calculate the source x and y coordinates
        const sx = column * frameWidth;
        const sy = row * frameHeight;
    
        // Save the current context state
        this.ctx.save();
    
        // Translate to the enemy's position
        this.ctx.translate(this.x * global.size, this.y * global.size);
    
        // Rotate the canvas context
        this.ctx.rotate(this.rotation);
    
        // Adjust size based on global.fac
        const adjustedSize = this.size * global.fac * this.animation.fac;
    
        // Draw the image with rotation, adjusting for the translation
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
    
        // Restore the context to its original state
        this.ctx.restore();
    }

    update(){
        if(this.dead || this.health <= 0){
            console.log(this.player.money, this.reward);
            this.player.money += this.reward;
            this.clearIntervals();
            global.game.objects.enemies = global.game.objects.enemies.filter(enemy => enemy !== this);
            global.game.objects.spritesheets.push(new SpriteSheet(this.deathAnimation.src, this.deathAnimation.size, this.deathAnimation.frames, {x: this.x, y: this.y, rotation: this.rotation}, this.deathAnimation.fac));
            return;
        }
        const target = this.path[this.pathIndex];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const adjustedSpeed = this.speed * global.fac;
        if(distance < adjustedSpeed / global.size){
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
            if(this.pathIndex >= this.path.length){
                this.currentMessage = this.messages.hitTower[Math.floor(Math.random() * this.messages.hitTower.length)];
                this.player.health -= this.definition.damage
                global.game.addMessage(this.currentMessage, this.definition.name);
                this.dead = true;
                if(this.player.health <= 0){
                    global.game.addMessage('Player dead', 'game');
                    global.game.gameOver();
                    return;
                }
                global.game.objects.enemies = global.game.objects.enemies.filter(enemy => enemy !== this);
                return;
            }
        }else{
            this.x += dx / distance * adjustedSpeed / global.size;
            this.y += dy / distance * adjustedSpeed / global.size;
            // Calculate rotation
            this.rotation = Math.atan2(dy, dx);
        }
    }

    clearIntervals(){
        clearInterval(this.animInterval);
    }

}