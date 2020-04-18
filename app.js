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
        update: update,
        extend: {
            player: null,
            healthpoints: null,
            reticle: null,
            moveKeys: null,
            playerBullets: null,
            enemyBullets: null,
            time: 0,
        }
    }

}

let game = new Phaser.Game(config);
let ship;
let bullets;
let lastFired = 0;
let target;

let Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'heroBulletShip');
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    },

    // Fires a bullet from the player to the reticle
    fire: function (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y)
        {
            this.xSpeed = this.speed*Math.sin(this.direction);
            this.ySpeed = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.xSpeed = -this.speed*Math.sin(this.direction);
            this.ySpeed = -this.speed*Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1800)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

});

function preload() {
    this.load.setBaseURL('http://localhost:8080/');
    this.load.image("ship", "image/Character/Frame/ship-7left.png.png");
    this.load.image("testScreen", "image/cadrillage.png");
    this.load.image("white", "image/white.png");
    this.load.image("heroBulletShip", "image/Character/bullet.png");
    this.load.image("target", "image/target.png");
}

function create() {
    console.log(this);

    // Set world bounds
    this.physics.world.setBounds(0, 0, 1600, 1200);

    // Add 2 groups for Bullet objects
    playerBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    // Add background player, enemy, reticle, healthpoint sprites
    this.add.image(0, 0, "white");
    this.add.image(0, 0, "testScreen");
    ship = this.physics.add.sprite(100, 100, "ship");
    target = this.physics.add.sprite(100,150,"target").setScale(4);   
    
    // Set image/sprite properties
    ship.body.collideWorldBounds = true;
    ship.setOrigin(0.5, 0.5).setDisplaySize(64, 64).setCollideWorldBounds(true).setDrag(500, 500);
    target.setOrigin(0.5, 0.5).setDisplaySize(18, 18).setCollideWorldBounds(true);

    // Set sprite variables
    // Set camera properties
    // Creates object for input with WASD kets
    moveKeys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.Z,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.Q,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });

    // Enables movement of player with WASD keys
    this.input.keyboard.on('keydown_Z', function (event) {
        ship.setAccelerationY(-800);
    });
    this.input.keyboard.on('keydown_S', function (event) {
        ship.setAccelerationY(800);
    });
    this.input.keyboard.on('keydown_Q', function (event) {
        ship.setAccelerationX(-800);
    });
    this.input.keyboard.on('keydown_D', function (event) {
        ship.setAccelerationX(800);
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_Z', function (event) {
        if (moveKeys['down'].isUp)
            ship.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            ship.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_Q', function (event) {
        if (moveKeys['right'].isUp)
            ship.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            ship.setAccelerationX(0);
    });

    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        if (ship.active === false)
            return;

    // Get bullet from bullets group
        var bullet = playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(ship, target);
            //this.physics.add.collider(enemy, bullet, enemyHitCallback);
        }
    }, this);

    // Pointer lock will only work after mousedown
    game.canvas.addEventListener('mousedown', function () {
        game.input.mouse.requestPointerLock();
    });

    // Exit pointer lock when A or escape (by default) is pressed.
    this.input.keyboard.on('keydown_A', function (event) {
        if (game.input.mouse.locked)
            game.input.mouse.releasePointerLock();
    }, 0, this);

    // Move reticle upon locked pointer move
    this.input.on('pointermove', function (pointer) {
        if (this.input.mouse.locked)
        {
            target.x += pointer.movementX;
            target.y += pointer.movementY;
        }
    }, this);
}
// Ensures sprite speed doesnt exceed maxVelocity while update is called
function constrainVelocity(sprite, maxVelocity)
{
    if (!sprite || !sprite.body)
      return;

    var angle, currVelocitySqr, vx, vy;
    vx = sprite.body.velocity.x;
    vy = sprite.body.velocity.y;
    currVelocitySqr = vx * vx + vy * vy;

    if (currVelocitySqr > maxVelocity * maxVelocity)
    {
        angle = Math.atan2(vy, vx);
        vx = Math.cos(angle) * maxVelocity;
        vy = Math.sin(angle) * maxVelocity;
        sprite.body.velocity.x = vx;
        sprite.body.velocity.y = vy;
    }
}
// Ensures reticle does not move offscreen
function constrainReticle(reticle)
{
    var distX = target.x-ship.x; // X distance between player & reticle
    var distY = target.y-ship.y; // Y distance between player & reticle

    // Ensures reticle cannot be moved offscreen (player follow)
    if (distX > 1280)
        target.x = ship.x+1280;
    else if (distX < -1280)
        target.x = ship.x-1280;

    if (distY > 720)
        target.y = ship.y+720;
    else if (distY < -720)
        target.y = ship.y-720;
}


function update(time, delta) {
    
    // Rotates player to face towards reticle
    ship.rotation = Phaser.Math.Angle.Between(ship.x, ship.y, target.x, target.y);

    // Rotates enemy to face towards player

    //Make reticle move with player
    target.body.velocity.x = ship.body.velocity.x;
    target.body.velocity.y = ship.body.velocity.y;

    // Constrain velocity of player
    constrainVelocity(ship, 500);

    // Constrain position of constrainReticle
    constrainReticle(target);

    // Make enemy fire

}
