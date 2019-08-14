import Dwarf from './character/Dwarf';

export default class Game {
  constructor(app, loader, resources) {
    this.app = app;
    this.loader = loader;
    this.resources = resources;
  }

  setup() {
    this.character = new Dwarf(this.resources, this.app.renderer.width / 2, this.app.renderer.height / 2);
    this.character.animatedSprite.play();
    this.app.stage.addChild(this.character.animatedSprite);
  }

}
