var loadState = {
    preload: function(){
        game.load.image('btncac', 'assets/img/btncac.png');
        game.load.image('btnKikoha', 'assets/img/btnKikoha.png');
        game.load.image('button', 'assets/img/button.png');
        game.load.image('background', 'assets/img/fondMEnu.png');
        game.load.image('namek', 'assets/img/Namek.jpg');
        game.load.image('kikohaPlayer','assets/img/kikoha.png');
        game.load.image('kikohaEnnemi','assets/img/rayonDeLaMort.png');
        game.load.spritesheet('player','assets/img/player.png',64,64,12);
        game.load.spritesheet('ennemie','assets/img/ennemie.png',64,64,11);
    },
    create: function(){
        game.state.start('menu')
    }
};