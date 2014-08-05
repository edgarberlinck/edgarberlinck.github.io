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
		utils.writeText("Main menu");
	}
}