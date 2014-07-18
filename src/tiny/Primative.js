Tiny.Primative = function(game, x, y, width, height, color) {
  this.color = color;
  Tiny.Sprite.call(this, game, x, y, width, height);
};

Tiny.Primative.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.Primative.prototype.constructor = Tiny.Primative;

Tiny.Primative.prototype.preRender = function() {
  Tiny.Sprite.prototype.preRender.call(this);
  this.ctx.fillStyle = this.color;
};