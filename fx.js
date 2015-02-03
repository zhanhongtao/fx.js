;(function( name, definition ) {
  var hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if ( hasDefine ) {
    define(definition);
  } else if (hasExports) {
    module.exports = definition();
  } else {
    this[name] = definition();
  }
})( 'FX', function() {
;(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

function FX(duration, callback, useStep) {
  if ( !(this instanceof FX) ) return new FX(duration, callback, useStep);
  this.duration = duration;
  this.useStep = !!useStep;
  this.frames = Math.ceil(this.duration / 16);
  this.frame = 0;
  this.past = 0;
  this.callback = function( per ) {
    callback(per);
    if (per == 1) {
      this.past = 0;
      this.frame = 0;
      this.timer = null;
    } else {
      this.play();
    }
    return this;
  };
  this._time = +new Date;
  this.play();
}

function frame() {
  if ( this.useStep ) {
    per = Math.min(1, ++this.frame / this.frames);
  } else {
    per = Math.min(1, (+new Date - this._time + this.past) / this.duration);
  }
  this.callback( per );
}

FX.prototype.play = function() {
  var context = this;
  this.timer = requestAnimationFrame(function() {
    frame.call(context);
  });
  return this;
};

FX.prototype.pause = function(toEnd) {
  if (this.timer) {
    cancelAnimationFrame(this.timer);
    if (toEnd) return this.callback(1);
    this.past += +new Date - this._time;
  }
  return this;
};

FX.prototype.resume = function() {
  this._time = +new Date;
  return this.play();
};

return FX;
});
