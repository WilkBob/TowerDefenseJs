import { addMessage, global } from '../main';

export class Bullet {
    constructor(ctx, tower, target) {
        this.ctx = ctx;
        this.angle = Math.atan2(target.y - tower.y, target.x - tower.x);
        this.x = tower.x
        this.y = tower.y
        this.target = target;
        this.speed = 0.05 * global.fac;
        this.damage = tower.damage;
        this.sizeFactor = 10 * global.fac;
        this.toRemove = false; // Flag to mark bullet for removal
    }


    update() {
        if (this.toRemove) return;

        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed) {
            addMessage(this.target.definition.messages.hit[Math.floor(Math.random() * this.target.definition.messages.hit.length)], this.target.definition.name);
            this.target.health -= this.damage;
            this.toRemove = true;
        } else {
            this.x += dx / distance * this.speed;
            this.y += dy / distance * this.speed;
        }
    }
    

    draw() {
        if (this.toRemove) return;

        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.x * global.size, this.y * global.size, this.sizeFactor, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

}