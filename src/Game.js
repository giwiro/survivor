import { Keyboard } from './Keyboard';
import Dwarf from './character/Dwarf';

export default class Game {
  constructor(app, loader, resources) {
    this.app = app;
    this.keyboard = new Keyboard([
      Keyboard.keys.KEYLEFT,
      Keyboard.keys.KEYUP,
      Keyboard.keys.KEYRIGHT,
      Keyboard.keys.KEYDOWN,
      Keyboard.keys.SPACE,
    ]);
    this.loader = loader;
    this.resources = resources;
  }

  setup() {
    this.keyboard.setup();
    this.character = new Dwarf(this.resources.dwarf.texture, this.keyboard, this.app.renderer.width / 2, this.app.renderer.height / 2);
    this.app.stage.addChild(this.character.animatedSprite);
  }

  nextTick(delta) {
    this.character.nextTick(delta);
  }

}
