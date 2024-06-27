import { global } from "../../main.js";

export class Clickmask {
    constructor(image) {
        console.log(image);
        this.image = new Image();
        this.image.src = image;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.canvas.width = global.size;
        this.canvas.height = global.size;
        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
            // Update imageData after the image is loaded and drawn
            this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        };
    }

    check(x, y) {
        x = Math.floor(x * global.size);
        y = Math.floor(y * global.size);
        const pixel = this.ctx.getImageData(x, y, 1, 1).data;
        // Return false for black pixels and true for non-black pixels
        return !(pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0);
    }

    resize() {
        this.canvas.width = global.size;
        this.canvas.height = global.size;
        // Correctly use canvas.width and canvas.height
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
        // Update imageData after resizing
        this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
}