class SceneTitle extends Phaser.Scene{
    constructor(){
        super("Menu");
    }

    create(){
        game.input.mouse.releasePointerLock();

        let title = this.add.text(20, 20,"Keep Space Alive", {font: "25px Arial", fill: "red"});
        title.setOrigin(0.5,0.5).setDisplaySize(500,100);
        title.setPosition(config.width*0.5,config.height*0.5 - 150);

        let play = this.add.text(20,20,"Play").setInteractive();
        play.setOrigin(0.5,0.5).setDisplaySize(200,100);
        play.setPosition(config.width*0.5,config.height*0.5);

        let setting = this.add.text(20,20,"Settings").setInteractive();
        setting.setOrigin(0.5,0.5).setDisplaySize(300,100);
        setting.setPosition(config.width*0.5,config.height*0.5 + 150);

        let about = this.add.text(20,20,"Created by R2D48 & MrSamafu !").setInteractive();
        about.setOrigin(1,1).setDisplaySize(250,20);
        about.setPosition(config.width -25,config.height -20);

        this.createStarfield();
        this.tintSelection(play);
        this.tintSelection(setting);
        this.tintSelection(about);
        
        play.once("pointerdown", function(){
            this.scene.start("playGame");
        },this);

        setting.once("pointerdown", function(){
            this.scene.start("playGame");
        },this);
    }
    createStarfield ()
    {
        //  Starfield background

        //  Note the scrollFactor values which give them their 'parallax' effect

        var group = this.add.group({ key: 'starLight1', frameQuantity:3 });

        group.createMultiple({ key: 'starLight2', frameQuantity: 3 });
        group.createMultiple({ key: 'starLight3', frameQuantity: 3 });
        group.createMultiple({ key: 'starLight4', frameQuantity: 3});
        

        var rect = new Phaser.Geom.Rectangle(0, 0, 1280, 720);

        Phaser.Actions.RandomRectangle(group.getChildren(), rect);

        group.children.iterate(function (child, index) {
            var sf = Math.max(0.3, Math.random());
            if (child.texture.key === 'starLight2')
            {
                sf = 0.2;
            }
            child.setScrollFactor(sf);
        }, this);
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