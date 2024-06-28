import { createStartMenu, createStartButton, createLevelSelectButton } from "./utils";
import { global } from "../../main.js";
export class PauseMenu{
    constructor(){
        this.StartMenu = createStartMenu();
        this.StartButton = createStartButton();
        this.StartMenu.appendChild(this.StartButton);

        this.StartButton.addEventListener('click', () => {
            this.StartMenu.style.display = 'none';
            global.game.unpause();
        });

        document.body.appendChild(this.StartMenu);
        this.StartMenu.style.display = 'none';
    }

    hide(){
        this.StartMenu.style.display = 'none';
    }

    show(){
        this.StartMenu.style.display = 'flex';
    }
}