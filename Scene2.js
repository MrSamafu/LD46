class Scene2 extends Phaser.Scene{
  constructor(){
    super("playGame");
  }

  create(){
    this.add.text(20, 20, "Playing game", {font: "25px Arial", fill: "yellow"});
    
    this.physics.world.setBounds(0, 0, 4000, 4000);
    this.cameras.main.setBounds(0,0,4000,4000).setName("main");
    
    this.createStarfield();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.ship = this.physics.add.sprite(config.width/2, config.height/2, "ship");
    this.target = this.physics.add.sprite(100,150,"target").setScale(4);
    // Set image/sprite properties
    this.ship.body.collideWorldBounds = true;
    this.ship.setOrigin(0.5, 0.5).setDisplaySize(64, 64).setCollideWorldBounds(true).setDrag(500, 500);
    this.target.setOrigin(0.5, 0.5).setDisplaySize(18, 18).setCollideWorldBounds(true);
  
    //Set camera
    this.cameras.main.startFollow(this.ship, true, 0.08, 0.08);
    this.cameras.main.setZoom(1.2);

    


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
            this.target.x += pointer.movementX;
            this.target.y += pointer.movementY;
        }
    }, this);
  }

  // Ensures sprite speed doesnt exceed maxVelocity while update is called
  constrainVelocity(sprite, maxVelocity)
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
  constrainReticle(reticle)
  {
      var distX = this.target.x-this.ship.x; // X distance between player & reticle
      var distY = this.target.y-this.ship.y; // Y distance between player & reticle

      // Ensures reticle cannot be moved offscreen (player follow)
      if (distX > config.width)
          this.target.x = this.ship.x+config.width;
      else if (distX < -config.width)
          this.target.x = this.ship.x-config.width;

      if (distY > config.height)
          this.target.y = this.ship.y+config.height;
      else if (distY < -config.height)
          this.target.y = this.ship.y-config.height;
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

  movePlayerManager() {
    this.ship.setAccelerationX(0);
    this.ship.setAccelerationY(0);

    if (this.cursorKeys.left.isDown) {
      this.ship.setAccelerationX(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.right.isDown) {
      this.ship.setAccelerationX(gameSettings.playerSpeed);
    }

    if (this.cursorKeys.up.isDown) {
      this.ship.setAccelerationY(-gameSettings.playerSpeed);
    } else if (this.cursorKeys.down.isDown) {
      this.ship.setAccelerationY(gameSettings.playerSpeed);
    }
  }

  update(){
    this.movePlayerManager();

    // Rotates player to face towards reticle
    this.ship.rotation = Phaser.Math.Angle.Between(this.ship.x, this.ship.y, this.target.x, this.target.y);

    //Make reticle move with player
    this.target.body.velocity.x = this.ship.body.velocity.x;
    this.target.body.velocity.y = this.ship.body.velocity.y;

    // Constrain velocity of player
    this.constrainVelocity(this.ship, 500);

    // Constrain position of constrainReticle
    this.constrainReticle(this.target);
  }
    
}