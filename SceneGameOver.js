class SceneGameOver extends Phaser.Scene{
    constructor(){
        super("gameOver");
    }
    create(){
        this.scene.stop("playGame");
        this.add.text(100,100,"Game Over", {font: "25px Arial", fill: "red"});
    }
}
