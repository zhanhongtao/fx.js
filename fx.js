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
  this.duration = this.remaining = duration;
  this.useStep = !!useStep;
  this.frames = Math.ceil(this.duration / 16);
  this.frame = 0;
  this.past = 0;
  this.callback = function( per, t, d ) {
    callback(per, t, d);
    if (per == 1) {
      this.past = 0;
      this.frame = 0;
      this.timer = null;
    } else {
      this.play();
    }
    return this;
  };
  this.play();
}

function frame() {
  var per;
  if ( this.useStep ) {
    per = Math.min(1, ++this.frame / this.frames);
    this.callback( per );
  } else {
    this.remaining -= +new Date - this.starttime; 
    this.remaining = Math.max(0, this.remaining);
    per = (this.remaining / this.duration) || 0;
    this.callback( 1 - per, this.duration - this.remaining, this.duration );
  }
}

FX.prototype.play = function() {
  var context = this;
  this.starttime = +new Date;
  this.timer = requestAnimationFrame(function() {
    frame.call(context);
  });
  return this;
};

FX.prototype.pause = function(toEnd) {
  if (this.timer) {
    cancelAnimationFrame(this.timer);
    if (toEnd) return this.callback(1);
    this.remaining = this.remaining - (+new Date - this.starttime);
  }
  return this;
};

FX.prototype.resume = function() {
  return this.play();
};

return FX;
});
