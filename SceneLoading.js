class SceneLoading extends Phaser.Scene{
    constructor(){
        super("bootGame");
    }
    preload(){
        this.load.image("starLight1", "assets/sprites/Decor/starsLight1.png");
        this.load.image("starLight2", "assets/sprites/Decor/starsLight2.png");
        this.load.image("starLight3", "assets/sprites/Decor/starsLight3.png");
        this.load.image("starLight4", "assets/sprites/Decor/starsLight4.png");
        this.load.image("enemy1", "assets/sprites/Enemy/enemy/enemy14.png");
        this.load.image("asteroid", "assets/sprites/Decor/asteroide.png");
        
    }
    create(){

        this.add.text(20,20,"Loading game...");
        this.scene.start("Menu");
        
        
    }
    
}

