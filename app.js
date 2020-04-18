const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }

}

var game = new Phaser.Game(config);
let ship;
let cursors;
let bullets;
var lastFired = 0;
let target;

function preload() {
    this.load.setBaseURL('http://localhost:8080/');
    this.load.image("ship", "image/Character/Frame/player.png");
    this.load.image("testScreen", "image/cadrillage.png");
    this.load.image("white", "image/white.png");
    this.load.image("heroBulletShip", "image/Character/bullet.png");
    this.load.image("target", "image/target.png");
}

function create() {
    console.log(this);
    this.add.image(0, 0, "white");
    this.add.image(0, 0, "testScreen");
    ship = this.physics.add.image(100, 100, "ship");
    ship.body.collideWorldBounds = true;

    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors)

    let Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'heroBulletShip');

            this.speed = Phaser.Math.GetSpeed(800, 1);
        },
        fire: function (x, y)
        {
            this.setPosition(x, y - 50);

            this.setActive(true);
            this.setVisible(true);
        },

        update: function (time, delta)
        {
            this.y -= this.speed * delta;

            if (this.y < -50)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }
    });
    bullets = this.add.group({
        classType: Bullet,
        maxSize: 10,
        runChildUpdate: true
    });
    target = this.add.image(0,0,"target").setScale(4);

    this.input.on('pointermove', function (pointer) {

        target.x = pointer.x;
        target.y = pointer.y;

    });
    
}


function update(time, delta) {
    
    ship.setVelocity(0,0)
    if(cursors.right.isDown){
        ship.setVelocity(500,0)
    }
    if(cursors.left.isDown){
        ship.setVelocity(-500,0)
    }
    if(cursors.up.isDown){
        ship.setVelocity(0,-500)
    }
    if(cursors.down.isDown){
        ship.setVelocity(0,500)
    }
    if (cursors.space.isDown && time > lastFired)
    {
        var bullet = bullets.get();

        if (bullet)
        {
            bullet.fire(ship.x, ship.y);

            lastFired = time + 50;
        }
    }

}