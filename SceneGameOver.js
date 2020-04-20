class SceneGameOver extends Phaser.Scene{
    constructor(){
        super("gameOver");
    }
    create(){

        this.physics.world.setBounds(0, 0, 1280, 720);
        this.cameras.main.setBounds(0,0,1280,720);
        this.add.text(100,100,"Game Over", {font: "25px Arial", fill: "red"});
    }
}
