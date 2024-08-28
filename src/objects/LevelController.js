import { global } from "../../main";

export class LevelController {
  constructor(player, level) {
    this.player = player;
    this.level = level;
    this.levelNumber = 1;
    this.waves = this.level.waves;
    this.wave = this.waves[0];
    this.waveNumber = this.wave.wave;
    this.timeouts = [];
  }

  loadLevel(levelDefinition) {
    this.level = levelDefinition;
    this.waves = this.level.waves;
    this.reset();

    global.game.loadBackground(levelDefinition.background);
    global.game.clickmask.newImage(levelDefinition.mask);
    global.game.player.reset();
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
  spawnWave() {
    console.log("spawning wave");
    console.log(this.waveNumber);
    console.log(this.level);

    if (this.waveNumber > this.waves.length) {
      console.log("level complete");
      // this.player.progress.level++;
      // this.player.save();
      // this.loadLevel(global.levelDefinitions[`level${this.player.progress.level}`]);
      // this.waveNumber = 0;
      return;
    }
    this.wave.groups.forEach((group) => {
      const to = setTimeout(() => {
        for (let i = 0; i < group.count; i++) {
          const t = setTimeout(() => {
            global.game.addEnemy(this.level[`path${group.path}`], group.type);
          }, i * group.interval);
          this.timeouts.push(t);
        }
      }, group.startDelay);
      this.timeouts.push(to);
    });

    this.waveNumber++;
    this.wave = this.waves[this.waveNumber - 1];
  }

  waveComplete() {
    console.log("wave complete");
    if (this.waveNumber > this.waves.length) {
      this.levelComplete();
    } else {
      this.spawnWave();
    }
  }

  levelComplete() {
    console.log("level complete");
    this.player.progress.level++;
    this.player.save();
    console.log(this.player.progress.level, "this is the level");
    this.loadLevel(global.levelDefinitions[`level${(this.levelNumber += 1)}`]);

    global.game.statecontroller.nextLevel();
    this.waveNumber = 1;
    this.reset();
  }

  reset() {
    this.waveNumber = 1;
    this.wave = this.waves[0];
    this.clearTimeouts();
  }
  //How to clear a set timeout you ask?
  //Use the clearTimeout method
  // clearTimeout(timeoutID);
  //You get the id of the timeout when you set it, so you can store it in an array, and then clear it when you need to.
  //You can also use the clearTimeout method to clear a timeout that is currently running.

  clearTimeouts() {
    this.timeouts.forEach((timeout) => {
      clearTimeout(timeout);
    });
  }
}
