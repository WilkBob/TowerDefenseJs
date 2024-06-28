import { createLevelSelectScreen } from "./utils";
import { global } from "../../main.js";
export class LevelSelectScreen{
    constructor(){
        this.levelSelectScreen = createLevelSelectScreen();
        document.body.appendChild(this.levelSelectScreen);
    }

    hide(){
        this.levelSelectScreen.style.display = 'none';
    }

    show(){
        this.levelSelectScreen.style.display = 'grid';
        if(global.game){
            const highest = global.game.player.progress.level //starts at 1
            const cards = document.querySelectorAll('.levelCard');
            cards.forEach((card, index) => {
                const unlocked = index < highest ? true : false;
                if(!unlocked){
                    card.classList.add('locked');
                }else{
                    card.classList.remove('locked');
                }
            });
        }
    }
}