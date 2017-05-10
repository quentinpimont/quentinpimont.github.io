var game = new Phaser.Game(640,480,Phaser.CANVAS,'game');
var ennemieStats = {
    pv : 200,
    att : 10,
    def : 20
};
var playerStats = {
    pv : 200,
    att : 20,
    def : 30
};
var state = 'choix';
    game.state.add('boot',bootState);
    game.state.add('menu',menuState);
    game.state.add('play',playState);
    game.state.add('load',loadState);
    game.state.start('boot');