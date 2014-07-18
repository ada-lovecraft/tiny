Tiny.Dot = function(game, x, y, radius, color) {
  this.radius = radius;
  Tiny.Primative.call(this, game, x, y, this.radius, this.radius, color);
};

Tiny.Dot.prototype = Object.create(Tiny.Primative.prototype);
Tiny.Dot.prototype.constructor = Tiny.Dot;

Tiny.Dot.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  this.ctx.closePath();
  this.ctx.fill();
};