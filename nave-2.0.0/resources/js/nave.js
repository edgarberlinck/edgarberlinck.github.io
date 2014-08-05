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
			this.animacao.excluirSprite(this);
			this.animacao.excluirSprite(sprite);
			this.colisor.excluirSprite(this);
			this.colisor.excluirSprite(sprite);

			var explosao1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
			var explosao2 = new Explosao(this.context, this.imgExplosao, sprite.x, sprite.y);
			
			this.animacao.novoSprite(explosao1);			
			this.animacao.novoSprite(explosao2);

			explosao1.fimDaExplosao = function() {
				nave.vidasExtras--;
				if (nave.vidasExtras < 0) {
					if (nave.acabaramVidas) nave.acabaramVidas();
				}
				else {
					nave.colisor.novoSprite(nave);
					nave.animacao.novoSprite(nave);

					nave.posicionar();
				}
			}
			
		}
	}

}