var menuState = {
    create: function () {
        this.backGround = game.add.sprite(-200,-100,'background');
        this.button = game.add.button(game.world.centerX,game.world.centerY,'button',test,this,2,1,1);
        this.button.anchor.set(0.5,0.5);
        playerStats.pv = 200;
        ennemieStats.pv = 200;
    }
};
    function test() {
        game.state.start('play');
    };