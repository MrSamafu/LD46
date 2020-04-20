class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene){
        let x = scene.ship.x;
        let y = scene.ship.y;

        super(scene,x,y,"bullet");
        this.speed = 1;
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
         
    }
    fire(target){
        this.setPosition(this.x, this.y); // Initial position
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

        this.rotation = this.rotation + 90; // angle bullet with shooters rotation
        this.born = 0; // Time since new bullet spawned
    }
    update(time, delta){
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
}