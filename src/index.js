// Generated by LiveScript 1.2.0
(function(){
  var slice$ = [].slice;
  module.exports = {
    emit: function(type){
      var args, ref$, evt, sub, handlers, i$, len$, handler, results$ = [];
      args = slice$.call(arguments, 1);
      ref$ = type.split(':'), evt = ref$[0], sub = slice$.call(ref$, 1);
      handlers = this.getHandlers(evt).concat(evt !== type
        ? this.getHandlers(type)
        : []);
      for (i$ = 0, len$ = handlers.length; i$ < len$; ++i$) {
        handler = handlers[i$];
        handler.apply(null, slice$.call(sub).concat(slice$.call(args)));
      }
      for (i$ = 0, len$ = (ref$ = this._anyHandlers || (this._anyHandlers = [])).length; i$ < len$; ++i$) {
        handler = ref$[i$];
        results$.push(handler.apply(null, [type].concat(slice$.call(args))));
      }
      return results$;
    },
    getHandlers: function(type){
      var ref$;
      return (ref$ = this._handlers || (this._handlers = {}))[type] || (ref$[type] = []);
    },
    on: function(type, handler){
      return this.getHandlers(type).push(handler);
    },
    once: function(type, handler){
      var this$ = this;
      return this.on(type, function wrap(args){
        this$.off(type, wrap);
        return handler.apply(null, args);
      });
    },
    off: function(type, handler){
      var f;
      if (type) {
        if (handler) {
          return (this._handlers || (this._handlers = {}))[type] = (function(){
            var i$, ref$, len$, results$ = [];
            for (i$ = 0, len$ = (ref$ = this.getHandlers(type)).length; i$ < len$; ++i$) {
              f = ref$[i$];
              if (f !== handler) {
                results$.push(f);
              }
            }
            return results$;
          }.call(this));
        } else {
          return (this._handlers || (this._handlers = {}))[type] = [];
        }
      } else {
        return this._handlers = {};
      }
    },
    onAny: function(handler){
      return (this._anyHandlers || (this._anyHandlers = [])).push(handler);
    },
    offAny: function(handler){
      var f;
      if (handler) {
        return this._anyHandlers = (function(){
          var i$, ref$, len$, results$ = [];
          for (i$ = 0, len$ = (ref$ = this._anyHandlers || (this._anyHandlers = [])).length; i$ < len$; ++i$) {
            f = ref$[i$];
            if (f !== handler) {
              results$.push(f);
            }
          }
          return results$;
        }.call(this));
      } else {
        return this._anyHandlers = [];
      }
    }
  };
}).call(this);