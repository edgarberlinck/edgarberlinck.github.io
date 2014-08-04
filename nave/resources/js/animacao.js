"use strict";

function Animacao(context){
	this.context = context;
	this.ligado = false;

	this.sprites = [];
	this.processamentos = [];
	this.spritesExcluir = [];
	this.processamentosExcluir = [];

	this.ultimoCiclo = 0;
	this.decorrido = 0;
}

Animacao.prototype = {
	novoSprite: function(sprite){
		this.sprites.push(sprite);
		sprite.animacao = this;
	},

	ligar: function(){
		// Quando a nimação parar e reiniciar devemos resetar o contador de ciclos.
		this.ultimoCiclo = 0;
		this.ligado = true;
		this.proximoFrame();
	},

	desligar: function(){
		this.ligado = false;
	},

	proximoFrame: function() {
		if (!this.ligado) return;

		/* Como o fundo é sempre atualizado não tem sentido em limpar
		   o canvas. Com isso economizamos algum processamento. */
		//this.limparTela();
		var agora = new Date().getTime();
		if (this.ultimoCiclo == 0) this.ultimoCiclo = agora;
		this.decorrido = agora - this.ultimoCiclo;

		for (var i in this.sprites)
			this.sprites[i].atualizar();

		for (var i in this.sprites)
			this.sprites[i].desenhar();

		for (var i in this.processamentos) 
			this.processamentos[i].processar();
			
		this.processarExclusoes();

		this.ultimoCiclo = agora;

		var animacao = this;
		requestAnimationFrame(function() {
			animacao.proximoFrame();
		});
	},

	limparTela: function() {
		var ctx = this.context;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	},
	
	novoProcessamento: function(processamento) {
		this.processamentos.push(processamento);
		processamento.animacao = this;
	}, 

	excluirSprite: function(sprite) {
		this.spritesExcluir.push(sprite);
	}, 

	excluirProcessamento: function(processamento) {
		this.processamentosExcluir.push(processamento);
	}, 

	processarExclusoes: function() {
		var newSprites = [];
		var newProcessamentos = [];

		for (var i in this.sprites) {
			if (this.spritesExcluir.indexOf(this.sprites[i]) === -1){
				newSprites.push(this.sprites[i]);
			}
		}

		for (var i in this.processamentos) {
			if (this.processamentosExcluir.indexOf(this.processamentos[i]) === -1){
				newProcessamentos.push(this.processamentos[i]);
			}
		}

		this.spritesExcluir = [];
		this.processamentosExcluir = [];
		
		this.sprites = newSprites;
		this.processamentos = newProcessamentos;
	}


}