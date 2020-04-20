const config = {
    width : 1280,
    height: 720,
    type: Phaser.AUTO,
    scene: [SceneLoading,SceneTitle,SceneGame],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: true
        }
    }
}
var game = new Phaser.Game(config);