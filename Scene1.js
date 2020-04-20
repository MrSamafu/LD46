class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("background", "assets/img/background.png");
    //
    this.load.spritesheet("ship", "assets/img/enemy.png",{
      frameWidth: 12,
      frameHeight: 12
    });
    this.load.spritesheet("ship2", "assets/img/enemy.png",{
      frameWidth: 12,
      frameHeight: 12
    });
    this.load.spritesheet("ship3", "assets/img/enemy.png",{
      frameWidth: 12,
      frameHeight: 12
    });
    this.load.spritesheet("explosion", "assets/img/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("power-up", "assets/img/powerUp.png",{
      frameWidth: 12,
      frameHeight: 12
    });
    this.load.spritesheet("player", "assets/img/player.png",{
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/img/bullet.png",{
      frameWidth: 6,
      frameHeight: 12
    });

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    // 1.1 load sounds in both formats mp3 and ogg
    this.load.audio("audio_beam", ["assets/snd/bullet.mp3"]);
    this.load.audio("audio_explosion", ["assets/snd/explo.mp3"]);
    this.load.audio("audio_pickup", ["assets/snd/powerUp.mp3"]);
    this.load.audio("music", ["assets/snd/keepSpaceAlive.mp3"]);
  }

  create() {



    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });



  }
}
