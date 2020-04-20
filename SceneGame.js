class SceneGame extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){
        //World and camera config
        this.physics.world.setBounds(0, 0, 4000, 4000);
        this.cameras.main.setBounds(0,0,4000,4000).setName("main");
        //load image and sprite
        this.enemy = this.add.sprite(100,100,"enemy1");
        this.asteroids = this.physics.add.group();
        //background
        this.createStarfield();
        this.asteroidField(this.asteroids,40);

        this.physics.add.collider(this.asteroids,this.asteroids);
        
        
    }
    //create the animated background
    createStarfield ()
    {
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
    asteroidField(asteroid,maxObject){
        for(let i = 0; i <= maxObject; i++){
            let asteroids =  this.physics.add.sprite(150, 150, "asteroid");
            asteroid.add(asteroids);
            asteroids.setRandomPosition(100 , 100, 3900, 3900);
            asteroids.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            asteroids.setCollideWorldBounds(true);
            asteroids.setBounce(1);
        }
        
        


    }
}