var gameSettings = {
    maxVelocity:500,
    playerSpeed:800,
    playerShipSize:24,
    worldWidth:4000,
    worldHeight:4000,
    maxEnergy: 40000,
    energy: 40000,
    asteroids: 0,
    maxAsteroid: 40,
    difficulty : 1,
    score: 0
}
const config = {
    width : 1280,
    height: 720,
    type: Phaser.AUTO,
    scene: [SceneLoading,SceneTitle,SceneGame,SceneGameOver],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    }
}
var game = new Phaser.Game(config);