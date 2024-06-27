import { createStartMenu, createStartButton } from "./utils";
import { global } from "../../main.js";
export class StartMenu{
    constructor(){
        this.StartMenu = createStartMenu();
        this.StartButton = createStartButton();
        this.StartMenu.appendChild(this.StartButton);
        this.StartButton.addEventListener('click', () => {
            this.StartMenu.style.display = 'none';
            global.game.start();
        });
        document.body.appendChild(this.StartMenu);
    }
}