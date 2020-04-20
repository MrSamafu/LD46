class Scene2 extends Phaser.Scene{
    constructor(){
      super("playGame");
    }
  
    create(){
      this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
      this.cameras.main.setBounds(0,0,4000,4000).setName("main");
      this.createStarfield();

    }
    createStarfield (){
      //  Starfield background

      //  Note the scrollFactor values which give them their 'parallax' effect

      var group = this.add.group({ key: 'starLight1', frameQuantity:50 });

      group.createMultiple({ key: 'starLight2', frameQuantity: 50 });
      group.createMultiple({ key: 'starLight3', frameQuantity: 50 });
      group.createMultiple({ key: 'starLight4', frameQuantity: 50 });      

      var rect = new Phaser.Geom.Rectangle(0, 0, 4000, 4000);

      Phaser.Actions.RandomRectangle(group.getChildren(), rect);

      group.children.iterate(function (child, index) {
        var sf = Math.max(0.3, Math.random());
        if (child.texture.key === 'bigStar')
        {
            sf = 0.2;
        }
        child.setScrollFactor(sf);
      }, this);
    }
  }