export class Outside extends Phaser.Scene {

  constructor(config) {
    
    super({
      key: "Outside",
      physics: {
        matter: {
          gravity: { y: 1 },
          debug: config.settings.debug
        }
      }
    })

    this.config = config
    
  }

  preload() {
    
  }

  create() {
    
  }

  update() {
    
  }

}