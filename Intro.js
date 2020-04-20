class Intro extends Phaser.Scene {
    constructor() {
      super("bootGame");
    }
  
    preload(){
    //image load
    this.load.image("ship", "assets/sprites/Character/Frame/ship-7left.png.png");
    this.load.image("ship2", "assets/sprites/Character/ship2.png");
    this.load.image("bullet", "assets/sprites/Bullet/bulletLaser.png");
    this.load.image("target", "assets/sprites/Ui/target.png");
    this.load.image("background", "assets/sprites/Decor/");
    this.load.image("enemy1", "assets/sprites/Enemy/enemy/enemy14.png");
    this.load.image("ammo","assets/sprites/PowerUp/Ammo.png");
    this.load.image("fuel","assets/sprites/PowerUp/fuel.png");
    this.load.image("life","assets/sprites/PowerUp/Life.png");
    this.load.image("powerup","assets/sprites/PowerUp/powerup.png");
    this.load.image("starLight1", "assets/sprites/Decor/starsLight1.png");
    this.load.image("starLight2", "assets/sprites/Decor/starsLight2.png");
    this.load.image("starLight3", "assets/sprites/Decor/starsLight3.png");
    this.load.image("starLight4", "assets/sprites/Decor/starsLight4.png");
    this.load.image("asteroid", "assets/sprites/Decor/asteroide.png");
  
      // 1.1 load sounds in both formats mp3 and ogg
      this.load.audio("laser", ["assets/snd/bullet.mp3"]);
      this.load.audio("audio_explosion", ["assets/snd/explo.mp3"]);
      this.load.audio("audio_pickup", ["assets/snd/powerUp.mp3"]);
      this.load.audio("music", ["assets/snd/keepSpaceAlive.mp3"]);
    }
  
    create() {
      this.add.text(20, 20, "Loading game...");
      this.scene.start("playGame");  
    }
  }
  