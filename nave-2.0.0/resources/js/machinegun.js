/*var SOM_TIRO = new Audio();
SOM_TIRO.src = 'resources/sounds/tiro.mp3';
SOM_TIRO.volume = 0.2;
SOM_TIRO.load();*/

function MachineGun(context, nave, heroInfo) {
	this.context = context;
	this.nave = nave;

	this.cor = 'blue';
	this.largura = 2;
	this.altura = 1;
	//this.x = this.nave.x + nave.sheet.larguraCena / 2 - this.largura / 2;
	//this.y = this.nave.y - this.altura;
	this.velocidade = heroInfo.shootSpeed;
	this.dano = heroInfo.shootPower;
	//SOM_TIRO.currentTime = 0.0;
	//SOM_TIRO.play();
}

MachineGun.prototype = {
	atualizar: function(){
		if (!this.x)
			this.x = this.nave.x + this.nave.sheet.larguraCena / 2 - this.largura / 2;
        if (!this.y)
        	this.y = this.nave.y - this.altura;

		this.y -= this.velocidade * this.animacao.decorrido / 1000;

		if (this.y < -this.altura) {
			this.animacao.excluirSprite(this);
			this.colisor.excluirSprite(this);
		}
	},

	desenhar: function(){
		var ctx = this.context;

		ctx.save();
		ctx.fillStyle = this.cor;
		ctx.fillRect(this.x, this.y, this.largura, this.altura);
		ctx.restore();
	},
	
	retangulosColisao: function() {
		return [{
			x: this.x,
			y: this.y,
			largura: this.largura,
			altura: this.altura
		}];
	},
	
	colidiuCom: function(sprite) {
		this.animacao.excluirSprite(this);
		this.colisor.excluirSprite(this);
		
		if (sprite.reciveDamage)
			sprite.reciveDamage(this);
	}
}