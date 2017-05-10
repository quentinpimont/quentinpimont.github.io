var menuState = {
    create: function () {
        this.button = game.add.button(game.world.centerX,game.world.centerY,'button',test,this,2,1,0);
        this.button.anchor.set(0.5,0.5);
        playerStats.pv = 200;
        ennemieStats.pv = 200;
    }
};
    function test() {
        game.state.start('play');
    };