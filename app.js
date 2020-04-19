const config = {
    width: 1280,
    height: 720,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
            ship: null,
            healthpoints: null,
            reticle: null,
            moveKeys: null,
            shipBullets: null,
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
let background;
let textAmmo;
let textLife;

let Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

    // Bullet Constructor
    function Bullet (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
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

        this.rotation = shooter.rotation + 90; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    },

    // Updates the position of the bullet each cycle
    update: function (time, delta)
    {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1500)
        {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }

});

function preload() {

    //URL server
    this.load.setBaseURL('http://localhost:8080/');

    //image load
    this.load.image("ship", "assets/sprites/Character/Frame/ship-7left.png.png");
    this.load.image("ship2", "assets/sprites/Character/ship2.png");
    this.load.image("bullet", "assets/sprites/Bullet/bulletLaser.png");
    this.load.image("target", "assets/sprites/Ui/target.png");
    this.load.image("background", "assets/sprites/Decor/");
    this.load.image("enemy1", "assets/sprites/Enemy/enemy/enemy14.png");

    //sound load
    this.load.audio("laser", "assets/sounds/laser.wav");
    this.load.audio("explo","assets/sounds/explo.wav");
    this.load.audio("powerUp","assets/sounds/powerUp.wav");
    this.load.audio("dammage","assets/sounds/dammage.wav");

}

function create() {
    console.log(this);

    // Set world bounds
    this.physics.world.setBounds(0, 0, config.width, config.height);

    // Add 2 groups for Bullet objects
    shipBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemyBullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

    //Add Text
    textShipInfo = this.add.text(10, 10 , '', {fill: "#00ff00"});
    

    // Add background player, enemy, reticle, healthpoint sprites
    ship = this.physics.add.sprite(config.width/2, config.height/2, "ship");
    target = this.physics.add.sprite(100,150,"target").setScale(4);
    enemy = this.physics.add.sprite(100, 100, "enemy1");
    
    // Add sounds
    let laser = this.sound.add("laser");
    let explo = this.sound.add("explo");
    let powerUp = this.sound.add("powerUp");
    let dammage = this.sound.add("dammage");
    
    // Set image/sprite properties
    ship.body.collideWorldBounds = true;
    ship.setOrigin(0.5, 0.5).setDisplaySize(64, 64).setCollideWorldBounds(true).setDrag(500, 500);
    target.setOrigin(0.5, 0.5).setDisplaySize(18, 18).setCollideWorldBounds(true);
    enemy.setOrigin(0.5, 0.5).setDisplaySize(64, 64).setCollideWorldBounds(true);

    // Set sprite variables
    ship.health = 300;
    ship.fuel = 500;
    ship.ammo = 150;
    enemy.health = 3;
    enemy.lastFired = 0;

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
        ship.fuel -=1;
        ship.setAccelerationY(-800);
        
    });
    this.input.keyboard.on('keydown_S', function (event) {
        ship.fuel -=1;
        ship.setAccelerationY(800);
        
    });
    this.input.keyboard.on('keydown_Q', function (event) {
        ship.fuel -=1;
        ship.setAccelerationX(-800);
        
    });
    this.input.keyboard.on('keydown_D', function (event) {
        ship.fuel -=1;
        ship.setAccelerationX(800);
        
    });

    // Stops player acceleration on uppress of WASD keys
    this.input.keyboard.on('keyup_Z', function (event) {
        if (moveKeys['down'].isUp)
            ship.fuel -=1;
            ship.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_S', function (event) {
        if (moveKeys['up'].isUp)
            ship.fuel -=1;
            ship.setAccelerationY(0);
    });
    this.input.keyboard.on('keyup_Q', function (event) {
        if (moveKeys['right'].isUp)
            ship.fuel -=1;
            ship.setAccelerationX(0);
    });
    this.input.keyboard.on('keyup_D', function (event) {
        if (moveKeys['left'].isUp)
            ship.fuel -=1;
            ship.setAccelerationX(0);
    });
    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer, time, lastFired) {
        laser.play();
        ship.ammo -= 1;
        if (ship.active === false)
            return;

        // Get bullet from bullets group
        var bullet = shipBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(ship, target);
            this.physics.add.collider(enemy, bullet, enemyHitCallback);
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
function enemyHitCallback(enemyHit, bulletHit)
{
    // Reduce health of enemy
    if (bulletHit.active === true && enemyHit.active === true)
    {
        enemyHit.health = enemyHit.health - 1;
        console.log("Enemy hp: ", enemyHit.health);

        // Kill enemy if health <= 0
        if (enemyHit.health <= 0)
        {
           enemyHit.setActive(false).setVisible(false);
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
        bulletHit.destroy();
    }
}
function playerHitCallback(playerHit, bulletHit)
{
    // Reduce health of player
    if (bulletHit.active === true && playerHit.active === true)
    {
        playerHit.health = playerHit.health - 1;
        console.log("Player hp: ", playerHit.health);

        // Kill hp sprites and kill player if health <= 0
        if (playerHit.health <= 0)
        {
            //Make here stateOfLife or lifeBar
            playerHit.setActive(false).setVisible(false);
            // Game over state should execute here
        }

        // Destroy bullet
        bulletHit.setActive(false).setVisible(false);
        bulletHit.destroy();
    }
}
function enemyFire(enemy, player, time, gameObject)
{
    if (enemy.active === false)
    {
        return;
    }

    if ((time - enemy.lastFired) > 1000)
    {
        enemy.lastFired = time;

        // Get bullet from bullets group
        var bullet = enemyBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(enemy, player);
            // Add collider between bullet and player
            gameObject.physics.add.collider(player, bullet, playerHitCallback);
        }
    }
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
    if (distX > config.width)
        target.x = ship.x+config.width;
    else if (distX < -config.width)
        target.x = ship.x-config.width;

    if (distY > config.height)
        target.y = ship.y+config.height;
    else if (distY < -config.height)
        target.y = ship.y-config.height;
}
// Enable enemy movement
function enemyMove(enemy, ship, gameObject){
    let distance = Phaser.Math.Distance.Between(enemy.x, enemy.y, ship.x, ship.y);
    
        if(distance < 4){
            enemy.body.reset(ship.x, ship.y);
        }
        else{
            gameObject.physics.moveToObject(enemy, ship , 200);
        }
}
// Refresh info interface
function interface(ship, text){
    text.setText([
        'Life : ' + ship.health,
        'Ammo : ' + ship.ammo,
        'Fuel : ' + ship.fuel
    ])
}

function update(time, delta) {

    //Display shipInfo
    interface(ship, textShipInfo);
    
    // Rotates player to face towards reticle
    ship.rotation = Phaser.Math.Angle.Between(ship.x, ship.y, target.x, target.y);

    // Rotates enemy to face towards player
    enemy.rotation = Phaser.Math.Angle.Between(enemy.x, enemy.y, ship.x, ship.y);

    //Make reticle move with player
    target.body.velocity.x = ship.body.velocity.x;
    target.body.velocity.y = ship.body.velocity.y;

    // Constrain velocity of player
    constrainVelocity(ship, 500);

    // Constrain position of constrainReticle
    constrainReticle(target);

    // Make enemy fire
    enemyFire(enemy, ship, time, this);

    //Move enemy
    enemyMove(enemy, ship, this);

}
