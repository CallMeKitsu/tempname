import config from "./config.json" assert { type: "json" };

import { Outside } from "./src/scenes/Outside.js";

const args = {
  width: config.main.width,
  height: config.main.height,
  type: Phaser.AUTO,
  resolution: 2.65,
  canvas: document.querySelector('#game-wrapper'),
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
      debug: config.settings.debug
    }
  },
  scene: [
    new Outside(config),
  ]
}

const game = new Phaser.Game(args)