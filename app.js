import config from "./config.json" assert { type: "json" };

import { Outside } from "./src/scenes/Outside.js";

const args = {
  width: config.main.width,
  height: config.main.height,
  type: Phaser.WEBGL ,
  resolution: config.main.resolution,
  canvas: document.querySelector('#game-wrapper'),
  fps: 60,
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: config.main.gravity },
      debug: config.settings.debug
    }
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  },
  scene: [
    new Outside(config),
  ]
}

const game = new Phaser.Game(args)