/**
 * Game Main Class
 * 
 * History
 * 08/05/2014 edgarberlinck: creator
 */

"use strict";

function Game(context) {
	this.context = context;
	utils = new Utils(context);
}

Game.prototype = {
	loadResources : function() {
		var audioUtils = new AudioUtils();
		audioUtils.game = this;
		audioUtils.loadResources();

		var imageUtils = new ImageUtils();
		imageUtils.game = this;
		imageUtils.loadResources();
	},

	updateLoading: function() {
		elementsLoaded++;
		var progress = (elementsLoaded / elementsToLoad) * 100;
		utils.clearScreen();
		utils.writeText("Loading Resources "+progress+"%");

		if (elementsLoaded === elementsToLoad)
			game.showMainMenu(); //Atributo declarado em index.html
	},

	showMainMenu: function() {
		utils.clearScreen();
		//TODO: Desenhar imagem de fundo
		this.context.save();
		this.context.drawImage(generalImageFiles.fundoEspaco, 0, 0, this.context.canvas.width, this.context.canvas.height);
		this.context.restore();
		
		document.getElementById("main-menu").style.display = "block";

		// Start the keyboard
		teclado = new Teclado(document);
		mainMenu = new Menu(teclado);

		teclado.disparou(SETA_ABAIXO, function() {
			mainMenu.atualizar();
		});
		teclado.disparou(SETA_ACIMA, function() {
			mainMenu.atualizar();
		});
		teclado.disparou(ENTER, function() {
			mainMenu.atualizar();
		});
	}	
}