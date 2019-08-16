import * as PIXI from 'pixi.js';
import { appendRectangleToTexture } from '../utils/texture';
import { Keyboard } from '../Keyboard';

export const standAnimationArray = [
  new PIXI.Rectangle(7, 10, 24, 20),
  new PIXI.Rectangle(44, 10, 26, 20),
  new PIXI.Rectangle(83, 10, 24, 20),
  new PIXI.Rectangle(121, 10, 24, 20),
  new PIXI.Rectangle(159, 10, 24, 20),
];

export const walkAnimationArray = [
  new PIXI.Rectangle(6, 43, 26, 19),
  new PIXI.Rectangle(43, 42, 27, 19),
  new PIXI.Rectangle(82, 43, 26, 19),
  new PIXI.Rectangle(121, 45, 24, 18),
  new PIXI.Rectangle(199, 43, 20, 19),
  new PIXI.Rectangle(236, 43, 22, 19),
  new PIXI.Rectangle(273, 45, 24, 18),
];

export const attackAnimationArray = [
  new PIXI.Rectangle(9, 107, 16, 21),
  new PIXI.Rectangle(41, 106, 33, 20),
  new PIXI.Rectangle(78, 106, 34, 19),
  new PIXI.Rectangle(117, 106, 32, 19),
  new PIXI.Rectangle(154, 105, 31, 19),
  new PIXI.Rectangle(195, 106, 24, 19),
];

export default class Dwarf {
  constructor(texture, keyboard, x, y) {
    this._texture = texture;
    this._keyboard = keyboard;
    this._animationState = Dwarf.animationTypes.STAND;
    const textures = appendRectangleToTexture(this._texture, standAnimationArray);
    this._animatedSprite = new PIXI.AnimatedSprite(textures);
    this._animatedSprite.position.set(x, y);
    this._animatedSprite.anchor.set(0.5, 1);
    this._animatedSprite.scale.set(2, 2);
    this._animatedSprite.animationSpeed = 0.08;
    this.changeAnimation(Dwarf.animationTypes.STAND);
  }

  get animatedSprite() {
    return this._animatedSprite;
  }

  nextTick(delta) {
    // console.log('this.keyboard.keysStatus', this.keyboard.keysStatus);
    if (this._keyboard.keysStatus[Keyboard.keys.KEYLEFT]) {
      this._animatedSprite.x -= 1;
      this._animatedSprite.scale.x = Math.abs(this._animatedSprite.scale.x) * (-1);
      this.changeAnimation(Dwarf.animationTypes.WALK);
    }
    if (this._keyboard.keysStatus[Keyboard.keys.KEYUP]) {
      this._animatedSprite.y -= 1;
      this.changeAnimation(Dwarf.animationTypes.WALK);
    }
    if (this._keyboard.keysStatus[Keyboard.keys.KEYRIGHT]) {
      this._animatedSprite.x += 1;
      this.changeAnimation(Dwarf.animationTypes.WALK);
      this._animatedSprite.scale.x = Math.abs(this._animatedSprite.scale.x);
    }
    if (this._keyboard.keysStatus[Keyboard.keys.KEYDOWN]) {
      this.changeAnimation(Dwarf.animationTypes.WALK);
      this._animatedSprite.y += 1;
    }
    if (this._keyboard.keysStatus[Keyboard.keys.SPACE]) {
      this.changeAnimation(Dwarf.animationTypes.SPACE);
    }
    // Rest when no key is pressed
    if (!this._keyboard.keysStatus[Keyboard.keys.KEYLEFT] &&
      !this._keyboard.keysStatus[Keyboard.keys.KEYUP] &&
      !this._keyboard.keysStatus[Keyboard.keys.KEYRIGHT] &&
      !this._keyboard.keysStatus[Keyboard.keys.KEYDOWN]) {
      this.changeAnimation(Dwarf.animationTypes.STAND);
    }
  }

  changeAnimation(type) {
    if (type === Dwarf.animationTypes.STAND && this._animationState !== Dwarf.animationTypes.STAND) {
      this._animationState = Dwarf.animationTypes.STAND;
      this.animatedSprite.textures = appendRectangleToTexture(this._texture, standAnimationArray);
      this._animatedSprite.animationSpeed = 0.08;
    } else if (type === Dwarf.animationTypes.WALK && this._animationState !== Dwarf.animationTypes.WALK) {
      this._animationState = Dwarf.animationTypes.WALK;
      this.animatedSprite.textures = appendRectangleToTexture(this._texture, walkAnimationArray);
      this._animatedSprite.animationSpeed = 0.15;
    } else if (type === Dwarf.animationTypes.SPACE && this._animationState !== Dwarf.animationTypes.SPACE) {
      this.animatedSprite.textures = appendRectangleToTexture(this._texture, attackAnimationArray);
      this._animatedSprite.animationSpeed = 0.8;
      this._animatedSprite.loop = false;
    }
    this.animatedSprite.play();
  }
}

Dwarf.animationTypes = Object.freeze({
  STAND: 'STAND',
  WALK: 'WALK',
  ATTACK: 'ATTACK',
});
