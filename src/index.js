import * as PIXI from 'pixi.js';
import bunny from '../assets/bunny.png';
import dwarf from '../assets/characters/dwarf.png';

import Game from './Game';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM
document.body.appendChild(app.view);

// load the texture we need
app.loader
  .add('dwarf', dwarf)
  .load((loader, resources) => {
    const game = new Game(app, loader, resources);
    game.setup();

    app.ticker.add((delta) => {
      game.nextTick(delta);
      // console.log('delta', delta);
      // index = (index + 1) % dwarfStandAnimationArray.length;
      // each frame we spin the bunny around a bit
      // dwarfTexture.frame = dwarfStandAnimationArray[index];
    });
  });
