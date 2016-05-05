/**
 * Game Main Class
 * 
 * History
 * 08/05/2014 edgarberlinck: creator
 */

'use strict';

function Game(context) {
  this.context = context;
  utils = new Utils(context);
  teclado = new Teclado(document);
  animacao = new Animacao(context);
  mainMenu = new Menu(this.context, teclado);
    
  this.hideMainMenu();
}

Game.prototype = {
  loadResources : function () {
    var audioUtils = new AudioUtils();
    audioUtils.game = this;
    audioUtils.loadResources();

    var imageUtils = new ImageUtils();
    imageUtils.game = this;
    imageUtils.loadResources();
},

  updateLoading: function () {
    elementsLoaded++;
    var progress = Math.floor((elementsLoaded / elementsToLoad) * 100);
    utils.clearScreen();
    utils.writeText("Loading Resources "+progress+"%");

    if (elementsLoaded === elementsToLoad){
      game.showMainMenu(); //Atributo declarado em index.html
    }
  },

  showMainMenu: function () {
    utils.clearScreen();
    animacao.novoSprite(mainMenu);
        
    teclado.disparou(SETA_ABAIXO, function () {
      if ( selectedMenu < menu.length - 1 ) {
        selectedMenu++;
      } else {
        selectedMenu = 0;
      }
    });
        
    teclado.disparou(SETA_ACIMA, function () {
      if (selectedMenu === 0) {
        selectedMenu - menu.length - 1;
      } else {
        selectedMenu--;
      }
    });

    teclado.disparou(ENTER, function () {
      mainMenu.processar();
    });

    animacao.ligar();
  },

  hideMainMenu: function () {
    teclado.disparou(SETA_ABAIXO, undefined);
    teclado.disparou(SETA_ACIMA, undefined);
    teclado.disparou(ENTER, undefined);

    animacao.excluirSprite(this.mainMenu);
  },

  resize: function () {
    var canvas = this.context.canvas;
    
    canvas.width  = window.innerWidth - 30;
    canvas.height = window.innerHeight - 30;
    if (canvas.width < 500){
      canvas.width = 500;
    }
    
    if (canvas.height < 500){
      canvas.height = 500;
    }
  }
}