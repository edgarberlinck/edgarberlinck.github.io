var MAX_HEROS = 4;

var heroes = [];

function HeroSelect(context, teclado) {
  this.context = context;
  this.teclado = teclado;
  this.heroSelected = 0;
  this.configure();
  this.loadHeroes();
}

HeroSelect.prototype = {
  atualizar: function () {

  },

  desenhar: function () {
    var ctx = this.context;
    ctx.drawImage(generalImageFiles.fundoEspaco, 0, 0, this.context.canvas.width, this.context.canvas.height);
    utils.writeTitle("Select your hero", 20, 20);
    
    ctx.lineWidth = 2;
    var x = 20;
    var y = 40;
    for(var hero in heroes) {
      ctx.save();
      ctx.strokeStyle = (this.heroSelected == hero) ? 'yellow' : 'white';
      ctx.strokeRect(x, y, ctx.canvas.width - 40, 80);

      var info = heroes[hero].information;
      
      heroes[hero].drawPicture(x + 30, y + 10);
      utils.writeTitle(info.name, x + 25, y + 70);

      var xText = x + 150;
      var yText = y + 20;
      utils.writeText("Speed: "+info.speed, xText, yText); yText += 10;
      utils.writeText("Shoot Type: "+info.shoot, xText, yText); yText += 10;
      utils.writeText("Shoot Power: "+info.shootPower, xText, yText); yText += 10;
      utils.writeText("Shot Interval: "+info.shootInterval, xText, yText); yText += 10;
      utils.writeText("Energy: "+info.energy, xText, yText);

      ctx.restore();
      y += 90;
    }
    y += 20;
    utils.writeTitle("Press ENTER to start", x, y);
    y += 20;
    utils.writeTitle("Press ESC to go back to main menu", x, y);
  },

  backToMainMenu: function () {
    animacao.excluirSprite(this);
    game.showMainMenu();
  },

  configure: function(){
    var kb = this.teclado;
    var heroSelect = this;
    kb.disparou(SETA_ABAIXO, function () {
      if (heroSelect.heroSelected < MAX_HEROS) {
        heroSelect.heroSelected++;
      }
    });

    kb.disparou(SETA_ACIMA, function () {
      if (heroSelect.heroSelected > 0) {
        heroSelect.heroSelected--;
      }
    });

    kb.disparou(ESCAPE, function () {
      heroSelect.backToMainMenu();
    });

    kb.disparou(ENTER, function () {
      heroSelect.selectHero();
    });
  },

  loadHeroes: function () {
    heroes = [];

    /*TODO each hero must have his own class.*/
    var infoHero1 = {
      name: 'hero 1',
      speed: 350,
      shoot: 'Machine Gun',
      shootPower: 4,
      shootInterval: 0.5,
      shootSpeed: 500,
      energy: 350
    }
        
    var infoHero2 = {
      name: 'hero 2',
      speed: 260,
      shoot: 'Missle',
      shootPower: 7,
      shootInterval: 3,
      shootSpeed: 500,
      energy: 230
    }
     
    var infoHero3 = {
      name: 'hero 3',
      speed: 280,
      shoot: 'Laser',
      shootPower: 10,
      shootInterval: 5,
      shootSpeed: 500,
      energy: 230
    }
    var hero1 = new Hero(this.context, this.teclado, imageStarshipFiles.defaultStarship, generalImageFiles.explosao, infoHero1);
    var hero2 = new Hero(this.context, this.teclado, imageStarshipFiles.defaultStarship, generalImageFiles.explosao, infoHero2);
    var hero3 = new Hero(this.context, this.teclado, imageStarshipFiles.defaultStarship, generalImageFiles.explosao, infoHero3);
    
    heroes.push(hero1);
    heroes.push(hero2);
    heroes.push(hero3);
  },

  selectHero: function () {
    gameController = new GameController(this.context, animacao, this.teclado, heroes[this.heroSelected]);
    gameController.startGame();
  }
};