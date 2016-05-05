function Utils(context) {
  this.context = context;
}

Utils.prototype = {
  randonInterval: function (min, max) {
    return min + Math.floor(5 + Math.random() * (max - min + 1));
  },

  writeText: function (texto, x, y, color) {
    this.context.save();
    this.context.fillStyle = color || 'white';
    this.context.font = '12px VT323';
    this.context.fillText(texto, x || 1, y || 12);
    this.context.restore();
  },

  writeTitle: function (texto, x, y, color) {
    this.context.save();
    this.context.fillStyle = color || 'white';
    this.context.font = '20px VT323';
    this.context.fillText(texto, x || 1, y || 12);
    this.context.restore();
  },

  clearScreen: function () {
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
};