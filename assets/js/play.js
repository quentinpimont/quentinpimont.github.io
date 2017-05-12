var playerAtt;
var ennemieAtt;
var ennemiePossibility = ['cac', 'kikoha'];
var playState = {
    create: function () {
        this.background = this.game.add.sprite(-10, 0, 'namek');
        this.background.width = '660';
        this.player = this.game.add.sprite(50, 355, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.ennemie = this.game.add.sprite(640 - 50, 355, 'ennemie');
        this.ennemie.scale.setTo(-1, 1);
        this.ennemie.anchor.setTo(0.5, 0.5);
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
        // crée les deux bouton pour les attaque du joueur 
        this.button = game.add.button(0, 432, 'btnKikoha', kikoha, this, 2, 1, 0);
        this.button = game.add.button(570, 432, 'btncac', cac, this, 2, 1, 0);
        // crée toutes les annimations que l'on a besoin
        this.playerHealth = new HealthBar(this.game, this.playerConfigBar);
        this.enemieHealth = new HealthBar(this.game, this.ennemieConfigBar);
        this.annimCacPlayer = this.player.animations.add('playerCac', [11, 5, 6, 7, 0], 6);
        this.annimKikohaPlayer = this.player.animations.add('playerKikoha', [2, 0], 1);
        this.annimDefPlayer = this.player.animations.add('playerDef', [8], 1);
        this.annimStansePlayer = this.player.animations.add('playerStanse', [0], 1);
        this.annimCacEnnemi = this.ennemie.animations.add('ennemiCac', [10, 1, 2, 3, 4, 5, 0], 8);
        this.annimKikohaEnnemi = this.ennemie.animations.add('ennemiKikoha', [7, 0], 1);
        this.annimDefEnnemi = this.ennemie.animations.add('ennemiDef', [8], 1);
        // variable qui sert a que l'ennemie ne choisit qu'une fois son attaque par tour
        this.iaChoice = true;
    },
    update: function(){
        // permet a l'affichage de barre de vie 
        this.enemieHealth.setPercent(ennemieStats.pv / 200 * 100);
        this.playerHealth.setPercent(playerStats.pv / 200 * 100);
        switch (state) {
            case 'choix':
                if (this.iaChoice) {
                    // choix de l'attaque de l'ia
                    ennemieAtt = ennemiePossibility[Math.floor(Math.random() * 3)];
                    this.iaChoice = false;
                }
                break;
            default:
                if (playerAtt === 'kikoha') {
                    this.annimKikohaPlayer.play('playerKikoha');
                    this.kikohaPayer = game.add.sprite(this.player.x,this.player.y,'kikohaPlayer');
                    game.physics.enable(this.kikohaPayer, Phaser.Physics.ARCADE);
                    this.kikohaPayer.angle = -45;
                    this.kikohaPayer.body.velocity.x = 500;
                    this.annimDefEnnemi.play('ennemiDef');
                    game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                        this.kikohaPayer.destroy(true,false);
                        ennemieStats.pv -= (playerStats.att * 5) - (ennemieStats.def / 1.5);
                        if (ennemieStats.pv <= 0) {
                            game.state.start('menu');
                        }
                    }, this);
                } else {
                    this.player.x = this.ennemie.x - 32;
                    this.annimDefEnnemi.play('ennemiDef');
                    this.annimCacPlayer.play('playerCac');
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                        ennemieStats.pv -= (playerStats.att * 4) - ennemieStats.def;
                        this.player.x = 50;
                        if (ennemieStats.pv <= 0) {
                            game.state.start('menu');
                        }
                    }, this);
                }
                game.time.events.add(Phaser.Timer.SECOND * 1.5, function () {
                    if (ennemieAtt === 'kikoha'){
                        this.annimKikohaEnnemi.play('ennemiKikoha');
                        this.annimDefPlayer.play('playerDef');
                        this.kikohaPayer = game.add.sprite(this.ennemie.x,this.ennemie.y + 30,'kikohaEnnemi');
                    game.physics.enable(this.kikohaPayer, Phaser.Physics.ARCADE);
                    this.kikohaPayer.angle = 180;
                    this.kikohaPayer.body.velocity.x = -450;
                        game.time.events.add(Phaser.Timer.SECOND * 1, function(){
                            this.kikohaPayer.destroy(true,false);
                            playerStats.pv -= (ennemieStats.att * 4) - playerStats.def;
                             this.annimStansePlayer.play('playerDef');
                            if (ennemieStats.pv <= 0) {
                                game.state.start('menu');
                            }
                        }
                        , this);
                    } else {
                        this.ennemie.x = this.player.x + 32;
                        this.annimDefPlayer.play('playerDef');
                        this.annimCacEnnemi.play('ennemiCac');
                        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                            playerStats.pv -= (ennemieStats.att * 5) - playerStats.def;
                            this.ennemie.x = 590;
                             this.annimStansePlayer.play('playerDef');
                            if (ennemieStats.pv <= 0) {
                                game.state.start('menu');
                            }
                        }
                        , this);
                    }
                }, this);
                this.iaChoice = true;
                state = 'choix';
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