import { global } from "../../main.js";
export class SpriteSheet{
    constructor(src, size, frames, pos, animationFac){
        this.x = pos.x;
        this.y = pos.y;
        this.rotation = pos.rotation;
        this.fac = animationFac
        this.image = new Image();
        this.image.src = src;
        this.size = size;
        this.frames = frames;
        this.frame = 0;
        this.loaded = false;
        this.image.onload = () => {
            this.loaded = true;
        }
        setInterval(() => {
            this.frame = (this.frame + 1)
        }, 1000/this.frames);

    }

   draw(){
    if(!this.loaded){
        return;
    }
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
    global.ctx.save();

    // Translate to the modified center of the image and rotate
    // Multiply this.x and this.y by global.canvas.height
    global.ctx.translate(this.x * global.canvas.height, this.y * global.canvas.height);
    global.ctx.rotate(this.rotation);

    const adjustedSize = this.size * global.fac * this.fac;
    // Draw the image
    global.ctx.drawImage(
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
    global.ctx.restore();
}
}