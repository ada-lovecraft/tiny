Tiny.Event = function() {
  this._handlers = [];

};

Tiny.Event.prototype.add = function(callback, ctx) {
  this._handlers.push({
    cb: callback,
    ctx: ctx, 
    once: false
  });
};

Tiny.Event.prototype.addOnce = function(callback, ctx) {
  this._handlers.push({
    cb: callback,
    ctx: ctx, 
    once: true
  });
};

Tiny.Event.prototype.remove = function(cb, ctx) {
  var handler;
  this._handlers.forEach(function(handler) {
    if(handler.cb === cb && handler.ctx === ctx) {
      this._handlers.splice(h,1);
    }
  }, this);
};

Tiny.Event.prototype.emit = function() {
  var handler, removals = [];
  var args = Array.prototype.slice.call(arguments);
  this._handlers.forEach(function(handler) {
    handler.cb.apply(handler.ctx, args);
    if (handler.once) {
      removals.push(handler);
    }
  });

  removals.forEach(function(handler) {
    this.remove(handler.cb, handler.ctx);
  }, this);
  
};