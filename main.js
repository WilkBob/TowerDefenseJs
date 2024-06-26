import '/style.css'


import { levelDefinitions } from './definitions/levels';
import { enemyDefinitions } from './definitions/enemies';
import { towerDefinitions } from './definitions/towers';
import { playerDefinition } from './definitions/newplayer';
import { Game } from './objects/Game';


const canvas = document.createElement('canvas');

document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

export const global = {
  canvas,
  ctx,
  size: null,
  baseSize: 1024,
  fac: null,
  fps: {
    frames: 0,
    fps: null
  },
  mouse: {
    x:null,
    y:null,
    radius:10,
    color: 'rgba(255,255,255,0.5)',
    down: false,
  },
  levelDefinitions,
  enemyDefinitions,
  towerDefinitions,
  playerDefinition,
  messageHistory:[],
  game:null,

}







//EventListeners
global.canvas.addEventListener('mousemove', (e) => {
  const rect = global.canvas.getBoundingClientRect();
  global.mouse.x = (e.clientX - rect.left) / global.size;
  global.mouse.y = (e.clientY - rect.top) / global.size;
});

global.canvas.addEventListener('mousedown', (e) => {
  global.mouse.down = true;
  console.log(global.mouse.down);
});

global.canvas.addEventListener('mouseup', (e) => {
  global.mouse.down = false;
});

window.addEventListener('resize', resize);
//Resize canvas
function resize(){
  //biggest possible square given the window size
  const size = Math.min(window.innerWidth, window.innerHeight);
  global.canvas.width = size;
  global.canvas.height = size;
  global.size = size;
  global.fac = size / global.baseSize;

}




function startGame(){
  resize();
  global.game = new Game();
  global.loop = loop();
}

function loop(){
  global.ctx.clearRect(0,0,global.canvas.width,global.canvas.height);
  global.game.update();
  global.game.draw();
  return requestAnimationFrame(loop);
}

startGame();
