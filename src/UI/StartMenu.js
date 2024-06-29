import { createStartMenu, createStartButton, createLevelSelectButton } from "./utils";
import { global } from "../../main.js";
export class StartMenu{
    constructor(){
        this.StartMenu = createStartMenu();
        this.StartButton = createStartButton('Start');
        this.StartMenu.appendChild(this.StartButton);
        this.StartButton.addEventListener('click', () => {
            this.StartMenu.style.display = 'none';
            global.game.statecontroller.start();
        });

        this.levelSelectButton = createLevelSelectButton();
        this.StartMenu.appendChild(this.levelSelectButton);
        this.levelSelectButton.addEventListener('click', () => {
            global.game.ui.levelSelect();
        });

        document.body.appendChild(this.StartMenu);
    }

    hide(){
        this.StartMenu.style.display = 'none';
    }

    show(){
        this.StartMenu.style.display = 'flex';
    }
}