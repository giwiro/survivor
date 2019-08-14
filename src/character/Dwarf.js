import * as PIXI from 'pixi.js';
import { appendRectangleToTexture } from '../utils/texture';

export const standAnimationArray = [
  new PIXI.Rectangle(7, 10, 24, 20),
  new PIXI.Rectangle(44, 10, 26, 20),
  new PIXI.Rectangle(83, 10, 24, 20),
  new PIXI.Rectangle(121, 10, 24, 20),
  new PIXI.Rectangle(159, 10, 24, 20),
];

export default class Dwarf {
  constructor(resources, x, y) {
    const textures = appendRectangleToTexture(resources.dwarf.texture, standAnimationArray);
    this._animatedSprite = new PIXI.AnimatedSprite(textures);
    this._animatedSprite.x = x;
    this._animatedSprite.y = y;
    this._animatedSprite.scale.set(2, 2);
    // this._animatedSprite.loop = false;
    this._animatedSprite.animationSpeed = 0.08;
  }

  get animatedSprite() {
    return this._animatedSprite;
  }

  nextTick() {

  }

  stand() {
    this.animatedSprite.textures = appendRectangleToTexture(resources.dwarf.texture, standAnimationArray);
    this._animatedSprite.animationSpeed = 0.08;
  }
}
