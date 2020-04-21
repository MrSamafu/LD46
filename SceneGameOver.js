class SceneGameOver extends Phaser.Scene{
    constructor(){
        super("gameOver");
    }
    create(){
        this.scene.stop("playGame");

        let score = this.add.text(100,100,"Score : " + gameSettings.score)
        score.setOrigin(0.5,0.5).setDisplaySize(300,100);
        score.setPosition(config.width*0.5,config.height*0.5 - 250);

        
        let gameOver = this.add.text(100,100,"Game Over", {font: "25px Arial", fill: "red"});
        gameOver.setOrigin(0.5,0.5).setDisplaySize(500,100);
        gameOver.setPosition(config.width*0.5,config.height*0.5 - 150);

        let retry = this.add.text(100,100,"Try again").setInteractive();
        retry.setOrigin(0.5,0.5).setDisplaySize(300,100);
        retry.setPosition(config.width*0.5,config.height*0.5);

        let menu = this.add.text(100,100,"Menu").setInteractive();
        menu.setOrigin(0.5,0.5).setDisplaySize(150,100);
        menu.setPosition(config.width*0.5,config.height*0.5 + 150);

        this.tintSelection(retry);
        this.tintSelection(menu);

        retry.once("pointerdown", function(){
            this.scene.start("playGame");
            gameSettings.energy = gameSettings.maxEnergy;
        },this);

        menu.once("pointerdown", function(){
            this.scene.start("Menu");
            gameSettings.energy = gameSettings.maxEnergy;
        },this);
    }
    tintSelection(elements){
        elements.on('pointerover', function () {

            elements.setTint(0x7878ff);
    
        });
    
        elements.on('pointerout', function () {
    
            elements.clearTint();
    
        });
    } 
}
