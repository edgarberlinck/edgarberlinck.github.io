function Utils(context) {
	this.context = context;
}

Utils.prototype = {
	randonInterval: function(min, max) {
		return min + Math.floor(5 + Math.random() * (max - min + 1));
	},

	writeText: function(texto, x, y) {
		this.context.save();
		//this.context.fillStyle = 'white';
		this.context.fillStyle = 'black';
		this.context.font = '12px courier-new';
		this.context.fillText(texto, x|1, y|12);
		//this.context.strokeText(texto, x|1, y|12);
		this.context.restore();
	}, 

	clearScreen: function() {
		var ctx = this.context;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
}