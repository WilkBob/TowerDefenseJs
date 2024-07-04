import { global } from "../../main";
import { levelDefinitions } from "../definitions/levels";
export class LevelController{
   constructor(player, level){
         this.player = player; 
         this.level = level; 
          this.waves = this.level.waves;
          this.wave = this.waves[0];
          this.waveNumber = this.wave.wave;
          this.timeouts = [];
   }

   init(){
     
        this.level = global.levelDefinitions[`level${this.player.progress.level}`];

   }

   loadLevel(levelDefinition){
        this.level = levelDefinition;
            this.waves = this.level.waves;
            this.wave = this.waves[0];
        global.game.loadBackground(levelDefinition.background);
        global.game.clickmask.newImage(levelDefinition.mask);
   }
//WAVE EXAMPLE
// {
//      wave: 4,
//      groups: [
//          {
//              type: 'Bigzombie',
//              path: 2,
//              startDelay: 1000,
//              interval: 0,
//              count: 1,
//          },
//          {
//              type: 'zombie',
//              path: 2,
//              startDelay: 11000,
//              interval: 1000,
//              count: 10,
//          },
//          {
//              type: 'Bigzombie',
//              path: 1,
//              startDelay: 1000,
//              interval: 0,
//              count: 1,
//          },
//          {
//              type: 'zombie',
//              path: 1,
//              startDelay: 11000,
//              interval: 1000,
//              count: 10,
//          },
//      ]

//  }
   spawnWave(){
     console.log('spawning wave');
     console.log(this.waveNumber);
     console.log(this.level);
     
     if(this.waveNumber > this.waves.length){
          console.log('level complete');
          // this.player.progress.level++;
          // this.player.save();
          // this.loadLevel(global.levelDefinitions[`level${this.player.progress.level}`]);
          // this.waveNumber = 0;
          return;
     }
           this.wave.groups.forEach(group => {
           
                const to = setTimeout(() => {
                for(let i = 0; i < group.count; i++){
                     const t = setTimeout(() => {
                         global.game.addEnemy(this.level[`path${group.path}`], group.type);
                     }, i * group.interval);
                         this.timeouts.push(t);
                }
                }, group.startDelay);
                this.timeouts.push(to);
           })
           
          this.waveNumber++;
          this.wave = this.waves[this.waveNumber -1];

          }

//How to clear a set timeout you ask?
//Use the clearTimeout method
// clearTimeout(timeoutID);
//You get the id of the timeout when you set it, so you can store it in an array, and then clear it when you need to.
//You can also use the clearTimeout method to clear a timeout that is currently running.

clearTimeouts(){
     this.timeouts.forEach(timeout => {
          clearTimeout(timeout);
     });
}


}