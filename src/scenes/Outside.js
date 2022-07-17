import { GameMap } from "../classes/Map.js"
import { Player } from "../classes/Player.js"

export class Outside extends Phaser.Scene {

  constructor(config) {
    
    super({
      key: "Outside",
      physics: {
        arcade: {
          gravity: { y: config.main.gravity },
          debug: config.settings.debug
        }
      }
    })

    this.config = config
    this.categories = {}
  }

  preload() {
    this.map = new GameMap(this, ["hs","interiors", "walls"], "outside")
    this.load.spritesheet('player', 'assets/sprites/player.png', { frameWidth : 18, frameHeight : 18 })
  }

  create() {

    this.map.build(["walls", "interiors", "interiors", "interiors", "walls"])
    this.player = new Player(this)

    this.physics.add.collider(this.player, this.hitboxes);

    this.cameras.main.setSize(this.config.main.width, this.config.main.height);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.zoomTo(this.config.settings.zoom)
  }

  update() {
    
    this.keys = this.input.keyboard.addKeys(this.config.settings.keys)

    if (this.keys.left.isDown) {

      this.player.left()

    }
    if (this.keys.right.isDown) {

      this.player.right()

    }
    if (this.keys.forward.isDown) {

      this.player.down()

    }
    if (this.keys.backward.isDown) {

      this.player.up()

    }
    if(this.keys.backward.isUp && this.keys.forward.isUp && this.keys.right.isUp && this.keys.left.isUp) {

      this.player.stand()
      
    }
  }

}