function Stage1() {
  // Each stage must start his own colisor.
  this.colisor = new Colisor();
};

Stage1.prototype = {
  start: function () {
    var animacao = this.gameController.animacao;
  	
    this.hero = this.gameController.hero;
    this.hero.colisor = this.colisor;

  	animacao.desligar();
  	animacao.limparTudo();
  	animacao.novoSprite(this.hero);

    var stageDescription = {
      processar : function () {
        utils.writeTitle("Stage 1", 10, 20, 'black');
      }
    } 

    var h = this.hero;    
    var rapidFire = {
      processar : function () {
        var shoot = teclado.pressionada(ESPACO);
        if (shoot) { 
          var agora = new Date().getTime();
                    
          if ( !h.ultimoTiro || (agora - h.ultimoTiro) / 100 >= h.shootInterval) {
            h.atirar();
            h.ultimoTiro = agora;
          }
        }
      }
    };

    animacao.novoProcessamento(rapidFire);
    animacao.novoProcessamento(stageDescription);

    this.hero.posicionar();
  	animacao.ligar();

    this.colisor.novoSprite(this.hero);
    this.createEnemies();
  }, 

  createEnemies: function() {
    
    var enemie = new Ovni(game.context, imageEnemies.ovni, generalImageFiles.explosao);
    
    enemie.velocidade = utils.randonInterval(100, 200);
    enemie.x = utils.randonInterval(imageEnemies.ovni.width, game.context.canvas.width - imageEnemies.ovni.width);
    enemie.y = -imageEnemies.ovni.height;

    this.colisor.novoSprite(enemie);

    animacao.novoSprite(enemie);
    animacao.novoProcessamento(this.colisor);
  }
};