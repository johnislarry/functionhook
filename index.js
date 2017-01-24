'use strict';

module.exports = function applyHook(obj, hook) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'function' && val.apply != null) {
      obj[key] = function() {
        hook();
        return val.apply(this, arguments);
      };
    } else if (typeof val === 'object') {
      setImmediate(function() {
        applyHook(val, hook);
      });
    }
  }
}

applyHook(global, () => console.log('hi'));