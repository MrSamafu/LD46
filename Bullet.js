class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.ship.x;
        var y = scene.ship.y;
    
        super(scene, x, y, "bullet");
    
        scene.add.existing(this);
    
        //this.play("beam_anim");
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;
    
        scene.projectiles.add(this);
      }
    
      update(){
        if(this.y < 32 ){
          this.destroy();
        }
      }
}