var playerAtt;
var ennemieAtt;
var ennemiePossibility = ['cac', 'kikoha'];
var playState = {
    create: function () {
        // initialise le brackground de la phase principale du jeu
        this.background = this.game.add.sprite(-10, 0, 'namek');
        // définis la taille du background en pixel
        this.background.width = '660';
        // crée le sprite du joueur
        this.player = this.game.add.sprite(50, 355, 'player');
        // met le point d'ancrage au millieu du sprite
        this.player.anchor.setTo(0.5, 0.5);
        // crée le sprite de l'ia
        this.ennemie = this.game.add.sprite(590, 355, 'ennemie');
        // inverse le sprite sur l'axe x
        this.ennemie.scale.setTo(-1, 1);
        // met le point d'ancrage au millieu du sprite
        this.ennemie.anchor.setTo(0.5, 0.5);
        // les deux objet suivant sont la config pour les barre de vie du joueur est l'ia(largeur, hauteur, couleur etc...)
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
        // instancie les barres de vie avec les configs ci-dessus
        this.playerHealth = new HealthBar(this.game, this.playerConfigBar);
        this.enemieHealth = new HealthBar(this.game, this.ennemieConfigBar);
        // crée les deux bouton pour les attaque du joueur
        this.buttonK = game.add.button(0, 432, 'btnKikoha', kikoha, this, 2, 1, 0);
        this.buttonC = game.add.button(570, 432, 'btncac', cac, this, 2, 1, 0);
        // crée toutes les annimations que l'on a besoin
        this.annimStansePlayer = this.player.animations.add('playerDef',[0],1);
        this.annimCacPlayer = this.player.animations.add('playerCac', [11, 5, 6, 7, 11, 0], 6);
        this.annimKikohaPlayer = this.player.animations.add('playerKikoha', [2, 0], 1);
        this.annimDefPlayer = this.player.animations.add('playerDef', [8], 1);
        this.annimDefCacPlayer = this.player.animations.add('playerDefCac', [11, 8, 11, 0], 3);
        this.annimDeathPlayer = this.player.animations.add('playerDeath', [9,10], 5);
        this.annimCacEnnemi = this.ennemie.animations.add('ennemiCac', [10, 1, 2, 3, 4, 5,10 ,0], 8);
        this.annimKikohaEnnemi = this.ennemie.animations.add('ennemiKikoha', [7, 0], 1);
        this.annimDefEnnemi = this.ennemie.animations.add('ennemiDef', [8], 1);
        this.annimDefCacEnnemi = this.ennemie.animations.add('ennemiDefCac', [10, 8, 10, 0], 3);
        this.annimDeathEnnemi = this.ennemie.animations.add('ennemiDeath', [9], 1);
        // variable qui sert a que l'ennemie ne choisit qu'une fois son attaque par tour
        this.iaChoice = true;
        this.visible = true;
    },
    update: function () {
        // definis le remplissage des barres de vie;
        this.enemieHealth.setPercent(ennemieStats.pv / 200 * 100);
        this.playerHealth.setPercent(playerStats.pv / 200 * 100);
        // les boutons sont visible si this.visible = true et ne le sont pas quand elle vaut false;
        this.buttonC.visible = this.visible;
        this.buttonK.visible = this.visible;
        switch (state) {
            // le momment de la partie où l'ont choiit son attaque
            case 'choix':
                // choix aléatoire de l'attaque par l'ia 
                if(this.iaChoice){
                    ennemieAtt = ennemiePossibility[Math.floor(Math.random() * 2)];
                    this.iaChoice = false;
                }
                this.visible = true;
                break;
            default:
                // rend invisible les bouton d'attaque
                this.visible = false;
                // si le joueur choisit l'attaque a distance 
                if (playerAtt === 'kikoha') {
                    this.annimKikohaPlayer.play('playerKikoha');
                    this.kikohaPayer = game.add.sprite(this.player.x, this.player.y, 'kikohaPlayer');
                    game.physics.enable(this.kikohaPayer, Phaser.Physics.ARCADE);
                    this.kikohaPayer.angle = -45;
                    this.kikohaPayer.body.velocity.x = 500;
                    this.annimDefEnnemi.play('ennemiDef');
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                        this.kikohaPayer.destroy(true, false);
                        ennemieStats.pv -= (playerStats.att * 5) - (ennemieStats.def / 1.5);
                        if (ennemieStats.pv <= 0) {
                            this.annimDeathEnnemi.play('ennemiDeath');
                            game.time.events.add(Phaser.Timer.SECOND * 1.2,function(){
                                game.state.start('menu');
                            },this);
                        }
                    }, this);
                //si le joueur choisit l'attaque au corps a corps;
                } else {
                    this.posX = 50 + Math.floor(Math.random() * 559);
                    this.posY = 0 + Math.floor(Math.random() * 355);
                    this.player.x = this.posX;
                    this.player.y = this.posY;
                    this.ennemie.x = this.posX + 32;
                    this.ennemie.y = this.posY;
                    this.annimDefCacEnnemi.play('ennemiDefCac');
                    this.annimCacPlayer.play('playerCac');
                    game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                        ennemieStats.pv -= (playerStats.att * 4) - ennemieStats.def;
                        this.player.x = 50;
                        this.player.y = 355;
                        this.ennemie.x = 590;
                        this.ennemie.y = 355;
                        if (ennemieStats.pv <= 0) {
                            this.annimDeathEnnemi.play('ennemiDeath');
                            game.time.events.add(Phaser.Timer.SECOND * 1.2,function(){
                                game.state.start('menu');
                            },this);
                        }
                    }, this);
                }
                // si l'ia choisit l'attaque a distance 
                game.time.events.add(Phaser.Timer.SECOND * 2.2, function () {
                    if (ennemieAtt === 'kikoha') {
                        this.annimKikohaEnnemi.play('ennemiKikoha');
                        this.annimDefPlayer.play('playerDef');
                        this.kikohaPayer = game.add.sprite(this.ennemie.x, this.ennemie.y + 30, 'kikohaEnnemi');
                        game.physics.enable(this.kikohaPayer, Phaser.Physics.ARCADE);
                        this.kikohaPayer.angle = 180;
                        this.kikohaPayer.body.velocity.x = -500;
                        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                            this.kikohaPayer.destroy(true, false);
                            playerStats.pv -= (ennemieStats.att * 4) - playerStats.def;
                            this.annimStansePlayer.play('playerDef');
                            if (playerStats.pv <= 0) {
                                this.annimDeathPlayer.play('playerDeath');
                                game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
                                    game.state.start('menu');
                                }, this);
                            }
                        }
                        , this);
                        //si le joueur choisit l'attaque au corps a corps;
                    } else {
                        this.posX = 50 + Math.floor(Math.random() * 559);
                        this.posY = 0 + Math.floor(Math.random() * 355);
                        this.player.x = this.posX;
                        this.player.y = this.posY;
                        this.ennemie.x = this.posX + 32;
                        this.ennemie.y = this.posY;
                        this.annimDefCacPlayer.play('playerDefCac');
                        this.annimCacEnnemi.play('ennemiCac');
                        game.time.events.add(Phaser.Timer.SECOND * 1, function () {
                            playerStats.pv -= (ennemieStats.att * 5) - playerStats.def;
                            this.player.x = 50;
                            this.player.y = 355;
                            this.ennemie.x = 590;
                            this.ennemie.y = 355;
                            this.annimStansePlayer.play('playerDef');
                            if (playerStats.pv <= 0){
                                this.annimDeathPlayer.play('playerDeath');
                                game.time.events.add(Phaser.Timer.SECOND * 1.2, function(){
                                    game.state.start('menu');
                                }, this);
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