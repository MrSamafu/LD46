class SceneLoading extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        //image load
        this.load.image("ship", "assets/sprites/Character/Frame/ship-7left.png.png");
        this.load.image("ship2", "assets/sprites/Character/ship2.png");
        //this.load.image("bullet", "assets/sprites/Bullet/bulletLaser.png");
        this.load.image("target", "assets/sprites/Ui/target.png");
        this.load.image("background", "assets/sprites/Decor/");
        this.load.image("ammo","assets/sprites/PowerUp/Ammo.png");
        this.load.image("fuel","assets/sprites/PowerUp/fuel.png");
        this.load.image("life","assets/sprites/PowerUp/Life.png");
        this.load.image("powerup","assets/sprites/PowerUp/powerup.png");
        this.load.image("starLight1", "assets/sprites/Decor/starsLight1.png");
        this.load.image("starLight2", "assets/sprites/Decor/starsLight2.png");
        this.load.image("starLight3", "assets/sprites/Decor/starsLight3.png");
        this.load.image("starLight4", "assets/sprites/Decor/starsLight4.png");
        this.load.image("enemy1", "assets/sprites/Enemy/enemy/enemy14.png");
        this.load.image("asteroid", "assets/sprites/Decor/asteroide.png");
        this.load.image("lifeBarIn", "assets/sprites/Ui/lifeBarIn.png");
        this.load.image("lifeBarOut", "assets/sprites/Ui/lifeBarOut.png");

        this.load.spritesheet("player", "assets/sprites/Character/player.png",{
            frameWidth: 24,
            frameHeight: 24
          });
        this.load.spritesheet("bullet", "assets/sprites/Bullet/bullet.png",{
            frameWidth: 6,
            frameHeight: 12
          });
        this.load.spritesheet("explosion", "assets/sprites/explosion.png",{
            frameWidth: 16,
            frameHeight: 16
          });

        this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

        //sound load
        this.load.audio("sndLaser", "assets/sounds/laser.mp3");
        this.load.audio("sndExplo","assets/sounds/explo.mp3");
        this.load.audio("sndPowerUp","assets/sounds/powerUp.mp3");
        this.load.audio("sndHit","assets/sounds/hit.mp3");
        this.load.audio("sndMusic","assets/musics/KeepSpaceAlive.mp3");
        
    }
    create(){

        this.add.text(20,20,"Loading game...");
        this.scene.start("Menu");

        this.anims.create({
            key: "thrust",
            frames: this.anims.generateFrameNumbers("player"),
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
            key: "bullet_anim",
            frames: this.anims.generateFrameNumbers("bullet"),
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
        
        
    }
    
}

