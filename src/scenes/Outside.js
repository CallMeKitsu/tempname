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
    this.load.image('hs', "assets/tilesets/hs.png")
    this.load.image('interiors', "assets/tilesets/interiors.png")
    this.load.image('walls', "assets/tilesets/walls.png")
    this.load.tilemapTiledJSON('map', 'assets/maps/outside.json')

    this.load.spritesheet('player', 'assets/sprites/player.png', { frameWidth : 18, frameHeight : 18 })
  }

  create() {
    
    const map = this.make.tilemap({key: "map", tileWidth: 16, tileHeigth: 16})
    
    const hs = map.addTilesetImage('hs', 'hs')
    const interiors = map.addTilesetImage('interiors', 'interiors')
    const walls = map.addTilesetImage('walls', 'walls')

    this.layers = {
      walls: map.createStaticLayer(0, walls, 0, 0),
      mid: map.createStaticLayer(1, interiors, 0, 0),
      ikea: map.createStaticLayer(2, interiors, 0, 0),
      props: map.createStaticLayer(3, interiors, 0, 0),
      edges: map.createStaticLayer(4, walls, 0, 0)
    }
    
    this.player = this.physics.add.sprite(40, 74, 'player', 0)
      .setCollideWorldBounds(true)

    this.hitboxes = this.physics.add.group()
    
    for (var object of map.getObjectLayer('hitboxes').objects) {
      let rect = this.add.rectangle(object.x + (object.width/2), object.y + (object.height/2), object.width, object.height, 0x6666ff, 0)
      this.physics.world.enable(rect)  
      rect.body.moves = false;
      this.hitboxes.add(rect)
    }

    this.physics.add.collider(this.player, this.hitboxes);
  }

  update() {
    
    this.keys = this.input.keyboard.addKeys(this.config.settings.keys)

    if (this.keys.left.isDown) {

      // this.player.anims.play('left', true)
      this.player.setVelocityX(-this.config.player.speed)

    }
    if (this.keys.right.isDown) {

      // this.player.anims.play('left', true)
      this.player.setVelocityX(+this.config.player.speed)

    }
    if (this.keys.forward.isDown) {

      // this.player.anims.play('left', true)
      this.player.setVelocityY(-this.config.player.speed)

    }
    if (this.keys.backward.isDown) {

      // this.player.anims.play('left', true)
      this.player.setVelocityY(+this.config.player.speed)

    }
    if(this.keys.backward.isUp && this.keys.forward.isUp && this.keys.right.isUp && this.keys.left.isUp) {

      // this.player.anims.play('stand', true)
      this.player.setVelocityX(0)
      this.player.setVelocityY(0)
      
    }
  }

}