
import { global } from "../../main.js";



export function borderRadiusRect(x, y, width, height, opacity, button = false){
    // Calculate scale factor based on the canvas size
    const borderRadius = button? 10 * global.fac : 5 * global.fac;
    //dont scale anything, just draw the rectangle
    global.ctx.beginPath();
    global.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
    global.ctx.lineWidth = 2;
    global.ctx.moveTo(x + borderRadius, y);
    global.ctx.lineTo(x + width - borderRadius, y);
    global.ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    global.ctx.lineTo(x + width, y + height - borderRadius);
    global.ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
    global.ctx.lineTo(x + borderRadius, y + height);
    global.ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    global.ctx.lineTo(x, y + borderRadius);
    global.ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    global.ctx.fill();
}