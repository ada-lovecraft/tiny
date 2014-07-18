Tiny.SpriteManager = function(game) {
  this.game = game;
  this._sprites = [];
};

Tiny.SpriteManager.prototype.add = function(sprite) {
  sprite.id = this._sprites.length;
  sprite.exists = true;
  sprite.alive = true;
  this._sprites.push(sprite);
  sprite.events.onAddedToWorld.emit(sprite);
};

Tiny.SpriteManager.prototype.sort = function(sort) {
  this._sprites.sort(sort);
};

Tiny.SpriteManager.prototype.preUpdate = function() {
  this._sprites.forEach(function(sprite) {
    sprite.preUpdate();
  });
};


Tiny.SpriteManager.prototype.update = function() {
  this._sprites.forEach(function(sprite) {
    if(sprite.exists) {
      sprite.update();
    }
  });
};

Tiny.SpriteManager.prototype.render = function() {
  this._sprites.forEach(function(sprite) {
    sprite.preRender();
    sprite.render();
    sprite.postRender();
  });
};


Object.defineProperty(Tiny.SpriteManager.prototype, 'children', {
  get: function() {
    return this._sprites;
  }
});
