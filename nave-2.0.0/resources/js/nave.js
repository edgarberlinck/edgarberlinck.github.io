function Nave(context, teclado, imagem, imgExplosao) {
	this.context = context;
	this.teclado = teclado;
	this.imagem = imagem;
	this.imgExplosao = imgExplosao;
	this.velocidade = 0;

	this.x = 0;
	this.y = 0;
  
	this.sheet = new Spritesheet(this.context, this.imagem, 3, 2);
	this.sheet.coluna = 0;
	this.sheet.intervalo = 100;

	this.acabaramVidas = null;
	this.vidasExtras = 3;
}

Nave.prototype = {
	atualizar: function() {
		var incremento = this.velocidade * animacao.decorrido / 1000;
		var kb = this.teclado;
		
		if (kb.pressionada(SETA_ESQUERDA) && this.x > 0)
			this.x -= incremento;
		if (kb.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.sheet.larguraCena)
			this.x += incremento;
		if (kb.pressionada(SETA_ACIMA) && this.y > 0)
			this.y -= incremento;	
		if (kb.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.sheet.alturaCena)
			this.y += incremento;
	},

	desenhar: function(){
		var kb = this.teclado;
		
		if (kb.pressionada(SETA_ESQUERDA))
			this.sheet.linha = 1;
		if (kb.pressionada(SETA_DIREITA))
			this.sheet.linha = 2;
		else
			this.sheet.linha = 0;

		this.sheet.desenhar(this.x, this.y);
		this.sheet.proximoQuadro();
	},

	posicionar: function() {
		var canvas = this.context.canvas;
		this.x = canvas.width / 2 - 18;
		this.y = canvas.height - 48;
	},

	atirar: function(tiro) {
		this.animacao.novoSprite(tiro);
		this.colisor.novoSprite(tiro);
	}
}