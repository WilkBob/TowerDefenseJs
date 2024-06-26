import { colors } from "../definitions/colors.js";
import { global } from "../main.js";
import { healthBar } from "./healthbar.js";

export class UI{
    constructor(){
        this.state = {
            health: 0,
            money: 200
        }
    
        // Ensure global.playerDefinition and its health property are defined
        if(global.playerDefinition && typeof global.playerDefinition.health !== 'undefined'){
            this.healthBar = new healthBar(10, 10, 200, 20, global.playerDefinition.health);
        } else {
            // Handle the case where global.playerDefinition is not ready
            console.error('global.playerDefinition is not defined or missing health property');
        }
    }

    update(){

        if(this.state.health < global.game.player.health){
                this.state.health++;
        }

        if(this.state.health > global.game.player.health){
            this.state.health--;
        }

        if(this.state.money < global.game.player.money){
            this.state.money++;
        }

        if(this.state.money > global.game.player.money){
            this.state.money--;
        }

    }

    draw(){
        global.ctx.fillStyle = colors.text;
        global.ctx.font = "20px Arial";
        
        global.ctx.fillText(`Money: ${this.state.money}`, 10, 60);



        this.healthBar.draw(this.state.health);
    }

}
