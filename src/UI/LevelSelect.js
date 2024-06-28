import { createLevelSelectScreen } from "./utils";

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
    }
}