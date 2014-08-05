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
	/* Este método é executado sempre que desenhamos a última animação.
	   deve ser sobrescrito nas outras classes que utilizam este classe.*/
	this.fimDoCiclo = null;
}

Spritesheet.prototype = {
	proximoQuadro: function(){
		var agora = new Date().getTime();

		if (!this.ultimoTempo) this.ultimoTempo = agora;
		if (agora - this.ultimoTempo < this.intervalo) return;

		if (this.coluna < this.numColunas - 1)
			this.coluna++;
		else {
			this.coluna = 0;
			if (this.fimDoCiclo) this.fimDoCiclo();
		}

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
