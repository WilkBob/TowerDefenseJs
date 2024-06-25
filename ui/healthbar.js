import { global } from "../main";
export class healthBar{
    constructor(x, y, width, height, maxHealth){
        this.ctx = global.ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        global.ui.healthBar=this;
    }

    draw(health){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x, this.y, this.width * (health / this.maxHealth), this.height);
    }
}