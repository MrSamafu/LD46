var gameSettings = {
    playerSpeed: 200,
    ship: null,
    healthpoints: null,
    reticle: null,
    moveKeys: null,
    shipBullets: null,
    enemyBullets: null,
    time: 0,
  }
  
  var config = {
    //width: 256,
    //height: 272,
    width: 1280,
    height: 720,
    backgroundColor: 0x000000,
    scene: [Intro, Scene2],
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: true,
          debugShowVelocity: false
      }
    }
  }
  
  
  var game = new Phaser.Game(config);