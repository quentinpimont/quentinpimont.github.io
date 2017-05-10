var playerAtt;
var ennemieAtt;
var ennemiePossibility = ['cac', 'kikoha'];
var playState = {
    create: function () {
        this.background = this.game.add.sprite(-10, 0, 'namek');
        this.background.width = '660';
        this.player = this.game.add.sprite(50, 355, 'player');
        this.ennemie = this.game.add.sprite(640 - 64 - 50, 355, 'ennemie');
        this.ennemie.scale.setTo(-1, 1);
        this.playerConfigBar = {
            width: 100,
            x: 55,
            y: 0,
            bg: {
                color: '#393936'
            },
            bar: {
                color: '#035509'
            },
            animationDuration: 200,
            flipped: false
        };
        this.ennemieConfigBar = {
            width: 100,
            x: 585,
            y: 0,
            bg: {
                color: '#393936'
            },
            bar: {
                color: '#035509'
            },
            animationDuration: 200,
            flipped: true
        };
        this.button = game.add.button(0, 432, 'btnKikoha', kikoha, this, 2, 1, 0);
        this.button = game.add.button(570, 432, 'btncac', cac, this, 2, 1, 0);
        this.playerHealth = new HealthBar(this.game, this.playerConfigBar);
        this.enemieHealth = new HealthBar(this.game, this.ennemieConfigBar);
    },
    update: function () {
        this.enemieHealth.setPercent(ennemieStats.pv / 200 * 100);
        this.playerHealth.setPercent(playerStats.pv / 200 * 100);
        switch (state) {
            case 'choix':
                this.iaChoice = true;
                if (this.iaChoice) {
                    ennemieAtt = ennemiePossibility[Math.floor(Math.random() * 3)];
                    this.iaChoice = false;
                }
                break;
            default:
                if (playerAtt == 'kikoha') {
                    ennemieStats.pv -= (playerStats.att * 5) - (ennemieStats.def / 1.5);
                } else {
                    ennemieStats.pv -= (playerStats.att * 4) - ennemieStats.def;
                }
                if (ennemieAtt == 'kikoha') {
                    playerStats.pv -= (ennemieStats.att * 4) - playerStats.def;
                } else {
                    playerStats.pv -= (ennemieStats.att * 5) - playerStats.def;
                }
                if (playerStats.pv <= 0 || ennemieStats.pv <= 0) {
                    game.state.start('menu');
                    
                }
                this.iaChoice = true;
                state = 'choix'
                break;
        }
    }
};
function cac() {
    playerAtt = 'cac';
    state = 'fight';
}
function kikoha() {
    playerAtt = 'kikoha';
    state = 'fight';
}