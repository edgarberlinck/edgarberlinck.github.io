var SONIC_DIREITA = 1;
var SONIC_ESQUERDA = 2;
var SONIC_PARADO = 0;
var SONIC_PARADO_DIREITA = 0;
var SONIC_PARADO_ESQUERDA = 1;

function Sonic(context, teclado, imagem) {
	this.context = context;
	this.teclado = teclado;
	this.x = 0;
	this.y = 0;

	this.sheet = new Spritesheet(context, imagem, 3, 8);
	this.sheet.intervalo = 60;

	this.andando = false;
	this.direcao = SONIC_DIREITA;

	this.velocidade = 10;
}

Sonic.prototype = {
	atualizar: function() {
		if (this.teclado.pressionada(SETA_DIREITA)) {
			if (!this.andando || this.direcao != SONIC_DIREITA){
				this.sheet.linha = SONIC_DIREITA;
				this.sheet.coluna = 0;
			}

			this.andando = true;
			this.direcao = SONIC_DIREITA;

			this.sheet.proximoQuadro();

			this.x += this.velocidade;
		}
		else if (this.teclado.pressionada(SETA_ESQUERDA)) {
			if (!this.andando || this.direcao != SONIC_ESQUERDA){
				this.sheet.linha = SONIC_ESQUERDA;
				this.sheet.coluna = 0;
			}

			this.andando = true;
			this.direcao = SONIC_ESQUERDA;

			this.sheet.proximoQuadro();
			this.x -= this.velocidade;
		} else {
			this.andando = false;
			this.sheet.linha = SONIC_PARADO;
			this.sheet.coluna = (this.direcao === SONIC_DIREITA)?SONIC_PARADO_DIREITA:SONIC_PARADO_ESQUERDA;

		}
	},
	desenhar: function() {
		this.sheet.desenhar(this.x, this.y);
	}
}