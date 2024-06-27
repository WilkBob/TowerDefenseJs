import { global } from "../../main.js";
export class healthBar{
    constructor(x, y, width, height, maxHealth){
        this.ctx = global.ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
    }

    draw(health){
    // Scale dimensions and positions
    const scaledX = this.x * global.fac;
    const scaledY = this.y * global.fac;
    const scaledWidth = this.width * global.fac;
    const scaledHeight = this.height * global.fac;

    // Draw red background
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);

    // Draw green health bar
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(scaledX, scaledY, scaledWidth * (health / this.maxHealth), scaledHeight);

    // Draw outline
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1 * global.fac; // Adjust lineWidth according to global.fac
    this.ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

    
}
}