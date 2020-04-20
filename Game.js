var gameSettings = {
    maxVelocity:500,
    playerSpeed:800,
    playerShipSize:24,
    worldWidth:4000,
    worldHeight:4000,
    energy: 250,
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
            debug: true
        }
    }
}
var game = new Phaser.Game(config);