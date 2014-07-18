function Carro(cor, velocidadeMaxima){
	console.log("New carro");
	this.cor = cor;
	this.velocidadeMaxima = velocidadeMaxima;
	this.velocidade = 0;
}
      
Carro.prototype = {
	acelerar : function() {
		if (this.velocidade < this.velocidadeMaxima)
			this.velocidade += 10;
	},

	reduzir : function () {
		if (this.velocidade > 0) {
			this.velocidade -= 10;
		}
	}
}