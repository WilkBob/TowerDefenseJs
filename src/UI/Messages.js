import { colors } from '../definitions/colors';
import { global } from '../../main.js';
import { borderRadiusRect } from './borderRadiusRect';

export class Messages{
    constructor(messages){
        this.messages = messages;
    }

    update(){
        if(this.messages.length > 5){
            this.messages.shift();
        }
    }
draw(){
    global.ctx.fillStyle = colors.background;
    global.ctx.font = `${20 * global.fac}px system-ui, -apple-system, Roboto, sans-serif`;
    this.messages.forEach((message, index) => {
        const x = 10 * global.fac;
        const y = (global.canvas.height - (this.messages.length - index) * 32 * global.fac) - 10 * global.fac;
        const width = message.length * 11 * global.fac;
        const height = 30 * global.fac;
        // Corrected opacity calculation: starts higher for newer messages
        const opacity = 0.2 + (0.6 * index / (this.messages.length - 1));

        borderRadiusRect(x, y, width, height, opacity);
        global.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        global.ctx.fillText(message, x + (10 * global.fac), y + (20 * global.fac));
    });
}
}