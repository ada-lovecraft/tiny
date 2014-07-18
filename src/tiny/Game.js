Tiny.Game = function(width, height, parent, options) {
  document = window.document;
  this.sprites = new Tiny.SpriteManager(this);
  this._parent = parent ? document.getElementById(parent) : document.body;
  
  this.canvas = null;
  this.ctx = null;

  this.width = width || window.innerWidth;
  this.height = height || window.innerHeight;

  this._addedLoops = []; // functions added to each loop frame
  this._drawLoop = null; //main loop
  this._preUpdate = null;

  this._lastTime = new Date();

  this._ftpsDiv = null; // ?

  this._collides = []; //array with references to objects with enabled collisions
  this._fixedIndexColl = []; // workaround for collisions
  this.animate = null;
  this._prefixJS = null;
  this.options = options;
  this.now = new Date();
  this.time = {
    now: new Date(),
    previous: new Date(),
    elapsed: 0
  };
};

Tiny.Game.prototype.preUpdate = function() {
   this.time.now = new Date();
  this.time.elapsed = this.time.now - this.time.previous;
  this.time.previous = this.time.now;
  this.sprites.preUpdate(this.time.elapsed);
  this.clear();
  this.update();
};

Tiny.Game.prototype.update = function() {
 
  this.sprites.update(this.time.elapsed);
  
  this.render();
};

Tiny.Game.prototype.render = function() {
  this.sprites.render(this.time.elapsed);
  this.animate = window.requestAnimationFrame(this.preUpdate.bind(this));
};

Tiny.Game.prototype.detectCanvas = function() {
  if(!document.createElement('canvas').getContext) {
    throw new Error('Canvas is not supported. Game will not run. Please kill yourself');
  } else {
    console.log('Canvas Available');
  }
};

Tiny.Game.prototype.init = function() {
  this.detectCanvas();
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');
  this.ctx.i = this.ctx.drawImage; // can probably remove this
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this._parent.appendChild(this.canvas);
  // sorting elements based on z index
  this.sprites.sort(Tiny.Utils.Sort.Z_ASCENDING);

  this.start();
};

Tiny.Game.prototype.start = function() {
  this.preUpdate();
};

Tiny.Game.prototype.stop = function() {
  window.cancelAnimationFrame(this.animate);
};

Tiny.Game.prototype.checkCollisions = function() {
  var loopIndex = this._collides.length,
      element,
      p1, p2,
      p1Top, p1Bottom, p1Left, p1Right,
      p2Top, p2Bottom, p2Left, p2Right;

  while(loopIndex--) {
    p1 = this._collides[loopIndex];
    p1Top = p1.posY + p1.cZ.t;
    p1Bottom = p1.posY + p1.height - p1.cZ.b;
    p1Left = p1.posX + p1.czl;
    p1Right = p1.posX + p1.width - p1.cZ.r;

    for(element in this._collides[loopIndex].hits) {
      p2 = this._fixedIndexColl[element];
      p2Top = p2.posY = p2.cZ.t;
      p2Bottom = p2.posY + p2.height - p2.cZ.b;
      p2Left = p2.posX + p2.cZ.l;
      p2Right = p2.posX + p2.width - p2.cZ.r;

      if(!(
          (p1Top > p2Bottom) ||
          (pBottom < p2Top) ||
          (p1Left > p2Right) ||
          (p1Right < p2Left)
         )) {
        this._collides[loopIndex].hits[element]();
      }
    }

    if(this.options.debug) {
      this.debugSprite(p1Top, p1Bottom, p1Left, p1Right);
      this.debugSprite(p2Top, p2Bottom, p2Left, p2Right);
    }
  }
};


Tiny.Game.prototype.debugSprite = function(top, bottom, left, right) {
  this.ctx.save();
  this.ctx.strokeStyle = '#ff00ff';
  this.ctx.beginPath();
  this.ctx.moveTo(right, top);
  this.ctx.lineTo(right,bottom);
  this.ctx.lineTo(left, bottom);
  this.ctx.lineTo(left, top);
  this.ctx.lineTo(right, top);
  this.ctx.closePath();
  this.ctx.stroke();
  this.ctx.restore();
};



Tiny.Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};


