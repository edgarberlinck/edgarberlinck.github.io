function GameController(context, animacao, teclado, hero){
	this.context = context;
	this.animacao = animacao;
	this.teclado = teclado;
	this.hero = hero;

	this.stageController = new StageController();
	this.stageController.gameController = this;
};

GameController.prototype = {
  startGame: function () {
  	this.teclado.limparTudo();
  	this.teclado.disparou(ENTER, this.pauseGame);
  	this.teclado.disparou(ESCAPE, this.quitGame);
    
  	this.stageController.startStage();
  },

  pauseGame: function () {
  	if (animacao.ligado) {
  		animacao.desligar();
  		utils.writeTitle("PAUSED - Press ESC to Quit", 10,  20, 'black');
  	} else {
  		animacao.ligar();
  	}
  },

  quitGame: function () {
  	if (!animacao.ligado && confirm("Are you sure?"))
  		game.showMainMenu();
  }
}