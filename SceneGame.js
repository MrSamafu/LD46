class SceneGame extends Phaser.Scene{
    constructor(){
        super("playGame");
    }
    create(){

        gameSettings.score = 0;
        gameSettings.asteroids = 0;

        //World and camera config
        this.physics.world.setBounds(0, 0, gameSettings.worldWidth, gameSettings.worldHeight);
        this.cameras.main.setBounds(0,0, gameSettings.worldWidth, gameSettings.worldHeight).setName("main");

        //load image and sprite
        this.enemy = this.add.sprite(100,100,"enemy1");
        this.asteroids = this.physics.add.group();
        this.ship = this.physics.add.sprite(gameSettings.worldWidth/2, gameSettings.worldHeight/2, "player");
        this.ship.body.enable;
        this.ship.play("thrust");
        this.target = this.physics.add.sprite(gameSettings.worldWidth/2, gameSettings.worldHeight/2+100,"target").setScale(4);   
        this.powerUp = this.add.sprite(16, 16, "powerup");
        this.bullet = this.physics.add.sprite(0,0,"bullet");
        this.textEnergy = this.add.text(0,0,"Energy");
        this.textScore = this.add.text(0,0,"");
        this.lifeBarIn = this.physics.add.image(gameSettings.worldWidth/2,gameSettings.worldWidth/2 - 100,"lifeBarIn");
        this.lifeBarOut = this.physics.add.image(gameSettings.worldWidth/2,gameSettings.worldWidth/2 -100,"lifeBarOut");
        
        

        this.projectiles = this.add.group();
        this.powerUps = this.physics.add.group();

        //Background
        this.createStarfield();
        this.asteroidField(this.asteroids,gameSettings.maxAsteroid, gameSettings.difficulty);

        // Set image/sprite properties
        this.ship.body.collideWorldBounds = true;
        this.ship.setOrigin(0.5, 0.5).setDisplaySize(gameSettings.playerShipSize, gameSettings.playerShipSize).setCollideWorldBounds(true).setDrag(500, 500);
        this.target.setOrigin(0.5, 0.5).setDisplaySize(18, 18).setCollideWorldBounds(true);
        this.lifeBarIn.setOrigin(0, 0);
        this.lifeBarOut.setOrigin(0, 0);

        //this.enemy.setOrigin(0.5, 0.5).setDisplaySize(64, 64).setCollideWorldBounds(true);
        
        //Set camera
        this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);
        this.cameras.main.setZoom(1.2);
        // Set sprite variables
        this.enemy.health = 3;
        this.enemy.lastFired = 0;
        //Physics and collider
        this.physics.add.collider(this.asteroids,this.asteroids);
        
        this.physics.add.overlap(this.ship,this.asteroids,this.hitShip,null,this);
        this.physics.add.overlap(this.projectiles, this.asteroids, this.hitAsteroids, null, this);
        this.physics.add.overlap(this.ship,this.powerUps, this.hitPowerUps, null, this);
        this.physics.add.collider(this.ship,this.asteroids);

        //the target
        this.pointerTarget(this.target, this.ship);

        //Hud Score
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(config.width, 0);
        graphics.lineTo(config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        //
        graphics.closePath();
        graphics.fillPath();

        this.score = 0;
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated  , 16);

        


        //Sounds
        this.bulletSound = this.sound.add("sndLaser");
        this.exploSound = this.sound.add("sndExplo");
        this.powerUpSound = this.sound.add("sndPowerUp");
        this.hitSound = this.sound.add("sndHit");

        //Music
        this.music = this.sound.add("sndMusic");
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
        this.input.on("pointerdown",function(pointer){
            if(pointer.leftButtonDown()){
                this.fireBullet(this.target);
            }
        },this)    
    }
    update(){
        //Make reticle move with player
        this.movePlayerManager(this.ship,this.target);
        this.target.body.velocity.x = this.ship.body.velocity.x;
        this.target.body.velocity.y = this.ship.body.velocity.y;
        
        this.lifeBar(this.lifeBarIn,this.lifeBarOut,this.ship, this.textEnergy, this.textScore);

        //call bullet update
        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var bullet = this.projectiles.getChildren()[i];
            bullet.update();
          }
        if(gameSettings.asteroids <= 35){
            this.asteroidField(this.asteroids,gameSettings.maxAsteroid, gameSettings.difficulty);
        }
    }

    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }

    hitAsteroids(projectile, asteroid) {
        var explosion = new Explosion(this, asteroid.x, asteroid.y);

        this.score += 10;
        var scoreFormated = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE " + scoreFormated;

    
        projectile.destroy();
        asteroid.destroy();
        this.exploSound.play();
        var kk = new Power(this, asteroid.x, asteroid.y);
        gameSettings.asteroids -= 1;
        gameSettings.score += 15;
    }

    hitPowerUps(ship,powerUps) {
        ship.body.velocity.x = ship.body.velocity.x;
        ship.body.velocity.y = ship.body.velocity.y;
        powerUps.destroy();
        gameSettings.energy+=2000;
        this.powerUpSound.play;

    }

    //Create the animated background
    createStarfield ()
    {
        //  Starfield background

        //  Note the scrollFactor values which give them their 'parallax' effect

        var group = this.add.group({ key: 'starLight1', frameQuantity:50 });

        group.createMultiple({ key: 'starLight2', frameQuantity: 50 });
        group.createMultiple({ key: 'starLight3', frameQuantity: 50 });
        group.createMultiple({ key: 'starLight4', frameQuantity: 50 });
        

        var rect = new Phaser.Geom.Rectangle(0, 0, gameSettings.worldWidth, gameSettings.worldHeight);

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
    //Create asteroids field
    asteroidField(asteroid,maxObject,difficulty){
        maxObject = maxObject * difficulty;
        gameSettings.maxAsteroid = maxObject;
        gameSettings.asteroids = gameSettings.maxAsteroid;
        for(let i = 0; i <= maxObject; i++){
            let asteroids =  this.physics.add.sprite(150, 150, "asteroid");
            asteroid.add(asteroids);
            asteroids.setRandomPosition(100 , 100, gameSettings.worldWidth-100, gameSettings.worldHeight-100);
            asteroids.setVelocity(Phaser.Math.Between(-100, 100), Phaser.Math.Between(-100, 100));
            asteroids.setCollideWorldBounds(true);
            asteroids.setBounce(1);
        }
        
        
    }
    //PlayerMovement an input control
    movePlayerManager(ship,target){
        // Creates object for input with WASD kets
        let moveKeys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
        // Rotates player to face towards reticle
        ship.rotation = Phaser.Math.Angle.Between(ship.x, ship.y, target.x, target.y)+Phaser.Math.DegToRad(90);
        // Enables movement of player with WASD keys
        this.input.keyboard.on('keydown_W', function (event) {
            gameSettings.energy -= 2;
            ship.setAccelerationY(-gameSettings.playerSpeed);   
        });
        this.input.keyboard.on('keydown_S', function (event) {
            gameSettings.energy -= 2;
            ship.setAccelerationY(gameSettings.playerSpeed);  
        });
        this.input.keyboard.on('keydown_A', function (event) {
            gameSettings.energy -= 2;
            ship.setAccelerationX(-gameSettings.playerSpeed);   
        });
        this.input.keyboard.on('keydown_D', function (event) {
            gameSettings.energy -= 2;
            ship.setAccelerationX(gameSettings.playerSpeed);   
        });
        // Stops player acceleration on uppress of WASD keys
        this.input.keyboard.on('keyup_W', function (event) {
            if (moveKeys['down'].isUp)
                
                ship.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_S', function (event) {
            if (moveKeys['up'].isUp)
                
                ship.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_A', function (event) {
            if (moveKeys['right'].isUp)
                
                ship.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup_D', function (event) {
            if (moveKeys['left'].isUp)
                
                ship.setAccelerationX(0);
        });
        this.constrainVelocity(ship, gameSettings.maxVelocity);

    }
    //SpeedLimit
    constrainVelocity(sprite, maxVelocity){
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
    pointerTarget(target){
        // Pointer lock will only work after mousedown
        game.canvas.addEventListener('mousedown', function () {
            game.input.mouse.requestPointerLock();
        });

        // Exit pointer lock when Q or escape (by default) is pressed.
        this.input.keyboard.on('keydown_Q', function (event) {
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
    gameOver(ship,item){
        game.input.mouse.releasePointerLock();
        this.music.stop();
        this.scene.start("gameOver");
        this.scene.stop("playGame");
        
    }
    fireBullet(target){
        let fire = new Bullet(this);
        gameSettings.energy -= 500;
        this.bulletSound.play();
    }
    lifeBar(lifeBarIn, lifeBarOut, ship, text, score){
        score.setPosition(ship.x-50,ship.y - 67);
        score.setText("Score : " + gameSettings.score)
        text.setPosition(ship.x-50,ship.y - 57);
        lifeBarOut.setPosition(ship.x-50,ship.y - 40);
        lifeBarIn.setPosition(ship.x-50,ship.y - 40);
        if(gameSettings.energy > gameSettings.maxEnergy){
            gameSettings.energy = gameSettings.maxEnergy;
        }
        else if(gameSettings.energy <= 0){
            this.gameOver()
        }
        else {
            lifeBarIn.setDisplaySize((gameSettings.energy*100)/gameSettings.maxEnergy,10);
        }
        
        lifeBarOut.setDisplaySize(100,10);
    }
    hitShip(ship, asteroid){
        ship.body.velocity.x = ship.body.velocity.x;
        ship.body.velocity.y = ship.body.velocity.y;
        gameSettings.energy -= 1000;
    }
}