import { global } from "../../main";
import { levelDefinitions } from "../definitions/levels";
export class LevelController{
   constructor(player, level){
         this.player = player; //also global.game.player
         this.level = level; //also global.game.level
        this.wave=null;
        this.waves = this.level.waves;
    ;
        this.spawnInterval = null;
        this.spawnTimeout = null;
        this.spawned = 0;
        this.spawnedThisWave = 0;
        this.waveInProgress = false;
        this.waveDelay = 0;
        this.waveTime = 0;
        this.waveStarted = false;
   }

   init(){
        this.wave = 0;
        this.level = global.levelDefinitions[`level${this.player.progress.level}`];

   }

   loadLevel(levelDefinition){
        this.level = levelDefinition;
        this.wave = 0;
        global.game.loadBackground(levelDefinition.background);
        global.game.clickmask.newImage(levelDefinition.mask);
   }


}