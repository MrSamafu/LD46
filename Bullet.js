class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.ship.x;
        var y = scene.ship.y;
    
        super(scene, x, y, "bullet");
        this.speed=900;
    
        scene.add.existing(this);
    
        this.play("bullet_anim");
        scene.physics.world.enableBody(this);

        this.direction = Math.atan( (scene.target.x-this.x) / (scene.target.y-this.y));
        // Calculate X and y velocity of bullet to moves it from shooter to scene.target
        if (scene.target.y >= this.y)
        {
            this.body.velocity.x = this.speed*Math.sin(this.direction);
            this.body.velocity.y = this.speed*Math.cos(this.direction);
        }
        else
        {
            this.body.velocity.x = -this.speed*Math.sin(this.direction);
            this.body.velocity.y = -this.speed*Math.cos(this.direction);
        }

        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, scene.target.x, scene.target.y)+Phaser.Math.DegToRad(90);

        scene.projectiles.add(this);
      }
    
      update(){
        if(this.y < 32 ){
          this.destroy();
        }
      }
}