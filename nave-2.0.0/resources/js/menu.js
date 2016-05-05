"use strict";

function Menu(context, teclado) {
  this.teclado = teclado;
  this.context = context;
}

Menu.prototype = {
  atualizar: function () {
    //nome
  },

  desenhar: function () {
    this.context.drawImage(generalImageFiles.fundoEspaco, 0, 0, this.context.canvas.width, this.context.canvas.height);
    var xPos = this.context.canvas.height / 2;
    var yPos = this.context.canvas.width / 2 - 130;
    utils.writeTitle(menu[0], yPos, xPos, selectedMenu === 0 ? 'yellow':undefined ); xPos += 30;
    utils.writeTitle(menu[1], yPos, xPos, selectedMenu === 1 ? 'yellow':undefined); xPos += 30;
    utils.writeTitle(menu[2], yPos, xPos, selectedMenu === 2 ? 'yellow':undefined); xPos += 30;
    utils.writeTitle(menu[3], yPos, xPos, selectedMenu === 3 ? 'yellow':undefined);

    utils.writeTitle("version "+version, 10, 20 );
  },

  processar: function () {
    switch(selectedMenu) {
    case 0:
      this.newGame(this.context);
      break;
    case 1:
      this.leaderboards(this.context);
      break;
    case 2:
      this.configurations(this.context);
      break;
    case 3:
      this.viewHelp(this.context);
      break;
    }
  }, 

  newGame: function () {
    game.hideMainMenu();

    var heroSelect = new HeroSelect(this.context, this.teclado);
    heroSelect.game = game;    

    animacao.novoSprite(heroSelect);
  },

  leaderboards: function () {
    alert("TODO");
  },

  configurations: function () {
    alert("TODO");
  },

  viewHelp: function () {
    alert("TODO");
  }
};