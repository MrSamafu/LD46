class SceneLoading extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        //image load
        this.load.image("ship", "assets/sprites/Character/Frame/ship-7left.png.png");
        this.load.image("ship2", "assets/sprites/Character/ship2.png");
        this.load.image("bullet", "assets/sprites/Bullet/bulletLaser.png");
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

        //sound load
        this.load.audio("laser", "assets/sounds/laser.wav");
        this.load.audio("explo","assets/sounds/explo.wav");
        this.load.audio("powerUp","assets/sounds/powerUp.wav");
        this.load.audio("dammage","assets/sounds/dammage.wav");
        this.load.audio("musicTheme","assets/musics/KeepSpaceAlive3.mp3");
        
    }
    create(){

        this.add.text(20,20,"Loading game...");
        this.scene.start("Menu");
        
        
    }
    
}

