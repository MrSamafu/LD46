class Power extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y){
    
        super(scene, x, y, "powerup");
    
        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        scene.powerUps.add(this);
      }
    
      update(){
        if(this.y < 32 ){
          this.destroy();
        }
      }
}