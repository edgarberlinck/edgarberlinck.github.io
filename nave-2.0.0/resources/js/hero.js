/*
  Has the basic hero attributes
 */

function Hero(context, teclado, imagem, imgExplosao, information){
  this.context = context;

  this.nave = new Nave(context, teclado, imagem, imgExplosao);
  this.nave.animacao = animacao;
  this.information = information;
  this.shootInterval = information.shootInterval;
  this.nave.velocidade = information.speed;
  this.energia = information.energy;
};

Hero.prototype = {
  atualizar: function () {
    this.nave.atualizar();
  },

  desenhar: function () {
  	this.nave.desenhar();
  },

  drawPicture: function (x, y) {
  	this.nave.x = x;
  	this.nave.y = y;
  	this.nave.sheet.desenhar(x,y);
  },

  posicionar: function () {
    this.nave.posicionar();
  },

  atirar: function () {
    this.tiro = new MachineGun(this.context, this.nave, this.information);
    this.tiro.colisor = this.colisor;
    this.nave.colisor = this.colisor;
    this.nave.atirar(this.tiro);
  },

  retangulosColisao: function() {
    return [
        {x: this.x+2, y: this.y+19, largura: 9, altura: 13},
        {x: this.x+13, y: this.y+3, largura: 10, altura: 33},
        {x: this.x+25, y: this.y+19, largura: 9, altura: 13}
    ];
  },
    
  colidiuCom: function(sprite) {
    // TODO
  },

  reciveDamage: function (tiro) {
    this.energia -= tiro.dano;
      
    if (this.energia <= 0) {
      this.animacao.excluirSprite(this);
      this.colisor.excluirSprite(this);

      this.explodir();
    }
  }, 

  explodir: function() {
    var explosao1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
    this.animacao.novoSprite(explosao1); 

    var n = this.nave;
    var h = this;
    var c = this.colisor;
    
    explosao1.fimDaExplosao = function() {   
      n.vidasExtras--;
      if (n.vidasExtras < 0) {
        if (n.acabaramVidas) n.acabaramVidas();
      }
      else {
        c.novoSprite(n);
        h.animacao.novoSprite(n);
        h.posicionar();
      }
    }
  }
}