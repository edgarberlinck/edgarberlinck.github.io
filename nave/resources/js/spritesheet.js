function Spritesheet(context, imagem, linhas, colunas) {
	this.context = context;
	this.imagem = imagem;
	this.numLinhas = linhas;
	this.numColunas = colunas;
	this.intervalo = 0;
	this.linha = 0;
	this.coluna = 0;
    this.larguraCena = this.imagem.width / this.numColunas;
	this.alturaCena = this.imagem.height / this.numLinhas;
}

Spritesheet.prototype = {
	proximoQuadro: function(){
		var agora = new Date().getTime();

		if (!this.ultimoTempo) this.ultimoTempo = agora;
		if (agora - this.ultimoTempo < this.intervalo) return;

		if (this.coluna < this.numColunas - 1)
			this.coluna++;
		else
			this.coluna = 0;

		this.ultimoTempo = agora;
	},

	desenhar: function(x, y) {
			this.larguraCena = this.imagem.width / this.numColunas;
			this.alturaCena = this.imagem.height / this.numLinhas;

			this.context.drawImage(this.imagem, 
				                   this.larguraCena * this.coluna,
				                   this.alturaCena * this.linha,
				                   this.larguraCena, 
				                   this.alturaCena, 
 					               x, 
					               y, 
					               this.larguraCena, 
					               this.alturaCena);
	}	
}
