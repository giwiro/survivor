import * as PIXI from 'pixi.js';
import bunny from '../assets/bunny.png';
import dwarf from '../assets/characters/dwarf.png';
import { dwarfStandAnimationArray } from './Dwarf';

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
        const textureArray = [];
        for (let i in dwarfStandAnimationArray) {
            textureArray.push(new PIXI.Texture(resources.dwarf.texture, dwarfStandAnimationArray[i]));
        }
        console.log('textureArray', textureArray);
        const animatedSprite = new PIXI.AnimatedSprite(textureArray);

        animatedSprite.x = app.renderer.width / 2;
        animatedSprite.y = app.renderer.height / 2;
        animatedSprite.scale.set(2, 2);
        // animatedSprite.loop = false;

        animatedSprite.animationSpeed = 0.08;
        animatedSprite.play();

        app.stage.addChild(animatedSprite);
        // This creates a texture from a 'bunny.png' image
        /*const dwarfTexture = resources.dwarf.texture;
        dwarfTexture.frame = dwarfStandAnimationArray[0];
        const dwarf = new PIXI.Sprite(dwarfTexture);

        dwarf.x = app.renderer.width / 2;
        dwarf.y = app.renderer.height / 2;
        dwarf.scale.set(2, 2);

        app.stage.addChild(dwarf);*/

        // let index = 0;

        app.ticker.add((delta) => {
            // console.log('delta', delta);
            // index = (index + 1) % dwarfStandAnimationArray.length;
            // each frame we spin the bunny around a bit
            // dwarfTexture.frame = dwarfStandAnimationArray[index];
        });

        /*// Setup the position of the bunny
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;

        // Rotate around the center
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;

        // Add the bunny to the scene we are building
        app.stage.addChild(bunny);

        // Listen for frame updates
        app.ticker.add(() => {
             // each frame we spin the bunny around a bit
            bunny.rotation += 0.01;
        });*/
    });
