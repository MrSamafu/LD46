class SceneTitle extends Phaser.Scene{
    constructor(){
        super("Menu");
    }

    create(){
        this.add.text(20, 20,"Click for play !", {font: "25px Arial", fill: "red"});
        this.input.on("pointerdown", function(){
            this.scene.start("playGame");
        },this);
    }
    
}