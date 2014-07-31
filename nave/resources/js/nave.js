function Nave(context, teclado, imagem) {
	this.context = context;
	this.teclado = teclado;
	this.imagem = imagem;
	this.velocidade = 5;
	/* Aqui eu consigo realizar esses calculos por que a imagem já estara carregada quando
	   esta classe for instanciada. */
	this.x = this.context.canvas.width / 2 - this.imagem.width / 2 - 25;
	this.y = this.context.canvas.height / 2 - this.imagem.height / 2;

	this.sheet = new Spritesheet(this.context, this.imagem, 3, 2);
	this.sheet.coluna = 0;
	this.sheet.velocidade = 60;
}

Nave.prototype = {
	atualizar: function() {
		var kb = this.teclado;
		var direcao;
		if (!direcao) direcao = 1;

		if (kb.pressionada(SETA_ESQUERDA) && this.x > 0)
			this.x -= this.velocidade;
		if (kb.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width)
			this.x += this.velocidade;
		if (kb.pressionada(SETA_ACIMA) && this.y > 0) {
			this.y -= this.velocidade;	
			direcao = 1; //FIXME definir em constante
		}
		if (kb.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.sheet.alturaCena) {
			this.y += this.velocidade;
			direcao = 0; //FIXME definir em constante
		}

		this.sheet.coluna = direcao;

		this.sheet.proximoQuadro();
	},

	desenhar: function(){
		this.sheet.desenhar(this.x, this.y);
	}, 

	atirar: function() {
		var t = new Tiro(this.context, this);
		this.animacao.novoSprite(t);
		this.colisor.novoSprite(t);
	},
	
	retangulosColisao: function(){
		return [
			{x: this.x+2, y: this.y+19, largura: 9, altura: 13},
			{x: this.x+13, y: this.y+3, largura: 10, altura: 33},
			{x: this.x+25, y: this.y+19, largura: 9, altura: 13}
		];
	},
	
	colidiuCom: function(sprite) {
		if (sprite instanceof Ovni) {
			this.animacao.desligar();
			alert('Game Over');
		}
	}

}