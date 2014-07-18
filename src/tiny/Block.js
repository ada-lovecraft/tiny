Tiny.Block = function(game, x, y, width, height, color) {
  Tiny.Primative.call(this, game, x, y, width, height, color);
};

Tiny.Block.prototype = Object.create(Tiny.Primative.prototype);
Tiny.Block.prototype.constructor = Tiny.Block;

Tiny.Block.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.rect(this.x, this.y, this.width, this.height);
  this.ctx.closePath();
  this.ctx.fill();
};