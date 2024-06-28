import { createStartMenu, createStartButton, createLevelSelectButton, createQuitButton } from "./utils";
import { global } from "../../main.js";
export class PauseMenu{
    constructor(){
        this.PauseMenu = createStartMenu();
        this.StartButton = createStartButton();
        this.PauseMenu.appendChild(this.StartButton);

        this.StartButton.addEventListener('click', () => {
            this.PauseMenu.style.display = 'none';
            global.game.unpause();
        });

        this.quitButton = createQuitButton();
        this.PauseMenu.appendChild(this.quitButton);

        document.body.appendChild(this.PauseMenu);
        this.PauseMenu.style.display = 'none';
    }

    hide(){
        this.PauseMenu.style.display = 'none';
    }

    show(){
        this.PauseMenu.style.display = 'flex';
    }
}