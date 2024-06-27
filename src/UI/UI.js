import { colors } from "../definitions/colors.js";
import { global } from "../../main.js";
import { Messages } from "./Messages.js";
import { StartMenu } from "./StartMenu.js";
import { healthBar } from "./healthbar.js";
import { createPauseButton, createTowerSelector } from "./utils.js";


export class UI{
    constructor(){
        this.state = {
            health: 0,
            money: 200,
            messages:[]
        }

        this.view = {
            hud: false,
            messages: true,
        }

        this.startMenu = new StartMenu();
        this.pauseButton = createPauseButton();
        this.pauseButton.style.display = 'none';
        document.body.appendChild(this.pauseButton);
        this.pauseButton.addEventListener('click', () => {
            global.game.pause();
        });
    
        this.towerSelector = createTowerSelector();
        document.body.appendChild(this.towerSelector);
        // Ensure global.playerDefinition and its health property are defined
    
        this.healthBar = new healthBar(10, 10, 200, 20, global.playerDefinition.health);
    

        this.messages = new Messages(this.state.messages);
    }

    start(){
        this.view.hud = true;
        this.view.messages = true;
        this.state.health = 0;
        this.pauseButton.style.display = 'block';
        this.towerSelector.style.display = 'block';
    }

    pause(){
        this.view.hud = false;
        this.view.messages = false;
        this.pauseButton.style.display = 'none';
        this.startMenu.StartMenu.style.display = 'flex';
        this.towerSelector.style.display = 'none';
    }

    unpause(){
        this.view.hud = true;
        this.view.messages = true;
        this.pauseButton.style.display = 'block';
        this.startMenu.StartMenu.style.display = 'none';
        this.towerSelector.style.display = 'block';
    }

    gameOver(){
        this.view.hud = false;
        this.view.messages = true;
        this.pauseButton.style.display = 'none';
        this.startMenu.StartMenu.style.display = 'flex';
        this.towerSelector.style.display = 'none';
    }

  update() {
    if (this.state.health < global.game.player.health) {
        this.state.health++;
    }

    if (this.state.health > global.game.player.health) {
        this.state.health--;
    }

    let moneyDifference = global.game.player.money - this.state.money;
    if (moneyDifference !== 0) {
        // Adjust the scaling factor based on the difference, ensuring it's not too slow and updates are whole numbers
        let scalingFactor = Math.ceil(Math.max(1, Math.abs(moneyDifference) / 10));
        this.state.money += Math.sign(moneyDifference) * Math.min(Math.abs(moneyDifference), scalingFactor);
    }

    if (this.view.messages) {
        this.messages.update();
    }
}

  drawMouse() {
    // Check if the game is paused first
    if (global.game.paused) {
        global.mouse.canPlace = false;
        global.ctx.fillStyle = 'rgba(255,255,255,0.5)'; // Set cursor to white
    } else {
        // Perform the original canPlace check if the game is not paused
        global.mouse.canPlace = global.game.clickmask.check(global.mouse.x, global.mouse.y);

        // Find the first tower the mouse is over
        const towerOver = global.game.objects.towers.find(tower => tower.isMouseOver);

        if (towerOver) {
            global.mouse.canPlace = false;
            global.mouse.radius = towerOver.range * global.size;
            console.log(towerOver.range);
        } else {
            global.mouse.radius = 10 * global.fac;
        }

        // Set the cursor color based on canPlace
        global.ctx.fillStyle = !global.mouse.canPlace ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,255,0.5)';
    }

    // Draw the cursor
    global.ctx.beginPath();
    global.ctx.arc(global.mouse.x * global.size, global.mouse.y * global.size, global.mouse.radius * global.fac, 0, Math.PI * 2);
    global.ctx.fill();
    global.ctx.closePath();
}

drawFps(){
    global.ctx.fillStyle = colors.text;
    const x = global.size -100 * global.fac;
    const y = global.size - 10 * global.fac;
    global.ctx.fillText(`FPS: ${global.fps.fps}`, x, y);
}

    draw(){
        global.ctx.fillStyle = colors.text;
            global.ctx.font = `${20 * global.fac}px system-ui, -apple-system, Roboto, sans-serif`;

            this.drawFps();
        
        if(this.view.hud){
            
            global.ctx.fillText(`Money: ${this.state.money}`, 10 * global.fac, 60 * global.fac);
            this.healthBar.draw(this.state.health);
    }
    if(this.view.messages){
        this.messages.draw();
    }

    
    }

}


