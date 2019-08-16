export class Keyboard {
  constructor(allowedKeys) {
    this.status = {};
    this.allowedKeys = allowedKeys;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  setup() {
    window.addEventListener('keydown', this.handleKeyDown, false);
    window.addEventListener('keyup', this.handleKeyUp, false);
  }

  unset() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  get keysStatus() {
    return this.status;
  }

  handleKeyDown(event) {
    if (this.allowedKeys.indexOf(event.keyCode) !== -1) {
      event.preventDefault();
      event.stopPropagation();
      this.status[`${event.keyCode}`] = true;
    }
  }

  handleKeyUp(event) {
    if (this.allowedKeys.indexOf(event.keyCode) !== -1) {
      event.preventDefault();
      event.stopPropagation();
      this.status[`${event.keyCode}`] = false;
    }
  }
}

Keyboard.keys = Object.freeze({
  'KEYLEFT': 37,
  'KEYUP': 38,
  'KEYRIGHT': 39,
  'KEYDOWN': 40,
  'SPACE': 32,
});
