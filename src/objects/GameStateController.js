import { global } from "../../main";
import Splash from '/images/splash.png';
export class GameStateController{
    constructor(){

    }
    click(){
        console.log('click');
    
        if(global.game.paused){
            return;
        }
        if(!global.game.selectedTower){
            global.game.ui.messages.addMessage('No tower selected', 'Game');
            return;
        }
        if(global.mouse.canPlace && global.game.loaded){
            global.game.addTower(global.mouse.x, global.mouse.y, global.towerDefinitions[global.game.selectedTower]);
        }else{
            global.game.ui.messages.addMessage('Cannot place tower here', 'Game');
        }
    }

    start(){
        global.game.levelcontroller.loadLevel(global.game.level);
        global.game.ui.start();

        global.game.paused = false;
        global.game.ui.messages.addMessage('Game started', 'Game');
      
    }

    pause(){
        global.game.paused = true;
        global.game.ui.pause();
    }

    unpause(){
        global.game.paused = false;
        global.game.ui.unpause();
    }

    quit(){
        global.game.levelcontroller.clearTimeouts();
        global.game.paused = true;
        global.game.loaded = false;
        global.game.ui.quit();
        global.game.objects.towers.forEach(tower => {
            clearInterval(tower.frameInterval);
            clearInterval(tower.shootInterval);
        });
        global.game.objects = {
            towers: [],
            bullets: [],
            enemies: [],
            spritesheets: [],
        }
        global.game.player.save();
        global.game.player.reset()
        global.game.loadBackground(Splash);
        global.game.ui.messages.addMessage('Game quit', 'Game');
    }

    gameOver(){
        global.game.paused = true;
        global.game.loaded = false;
        global.game.ui.gameOver();
        global.game.objects.towers.forEach(tower => {
            clearInterval(tower.frameInterval);
            clearInterval(tower.shootInterval);
        });
        global.game.objects = {
            towers: [],
            bullets: [],
            enemies: [],
            spritesheets: [],
        }
        global.game.player.save();
        global.game.player.reset();
        global.game.loadBackground(Splash);
        global.game.ui.messages.addMessage('Game over', 'Game');
    }
}