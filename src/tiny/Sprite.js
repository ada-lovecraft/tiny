Tiny.Sprite = function(game, x, y, width, height) {
  this.game = game;
  this.ctx = this.game.ctx;
  this.initial = {
    width: width,
    height: height,
    position: new Tiny.Point(x,y)
  };
  this.width = width;
  this.height = height;
  
  this.health = 1;
  this.speed = 1;

  this.collides = false;

  this.hits = {};
  
  this.position = new Tiny.Point(x, y, 1);

  this.bounds = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  };

  this.alive = false;
  this.exists = false;

  this.events = {
    onAddedToWorld: new Tiny.Event(),
    onKilled: new Tiny.Event(),
    onRevived: new Tiny.Event(),
    onMouseOver: new Tiny.Event(),
    onMouseOut: new Tiny.Event(),
    onMouseDown: new Tiny.Event(),
    onMouseUp: new Tiny.Event()
  };

};

Tiny.Sprite.prototype.preUpdate = function() {

};

Tiny.Sprite.prototype.update = function() {
};

Tiny.Sprite.prototype.preRender = function() {
  this.ctx.save();
};

Tiny.Sprite.prototype.render = function() {
  
};

Tiny.Sprite.prototype.postRender = function() {
  this.ctx.restore();
  
};




Object.defineProperty(Tiny.Sprite.prototype, 'x', {
  get: function() {
    return this.position.x;
  },
  set: function(value) {
    this.position.x = value;
  }
});

Object.defineProperty(Tiny.Sprite.prototype, 'y', {
  get: function() {
    return this.position.y;
  },
  set: function(value) {
    this.position.y = value;
  }
});

Object.defineProperty(Tiny.Sprite.prototype, 'z', {
  get: function() {
    return this.position.z;
  },
  set: function(value) {
    this.position.z = value;
    this.game.sprites.sort(Tiny.Utils.Sort.Z_ASCENDING);
  }
});