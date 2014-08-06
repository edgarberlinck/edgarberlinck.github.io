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
	
	// Start the keyboard
	this.teclado = new Teclado(document);
	this.hideMainMenu();
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
		var progress = Math.floor((elementsLoaded / elementsToLoad) * 100);
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
		
		
		mainMenu = new Menu(this.teclado);

		this.teclado.disparou(SETA_ABAIXO, function() {
			mainMenu.atualizar();
		});
		this.teclado.disparou(SETA_ACIMA, function() {
			mainMenu.atualizar();
		});
		this.teclado.disparou(ENTER, function() {
			mainMenu.atualizar();
		});

		document.getElementById("main-menu").style.display = "block";
	},

	hideMainMenu: function() {
		document.getElementById("main-menu").style.display = "none";	
		this.teclado.disparou(SETA_ABAIXO, undefined);
		this.teclado.disparou(SETA_ACIMA, undefined);
		this.teclado.disparou(ENTER, undefined);
	}
}