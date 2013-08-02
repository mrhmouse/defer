// Generated by CoffeeScript 1.6.2
(function() {
  var Defer, EventEmitter,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  EventEmitter = require('events').EventEmitter;

  Defer = {
    chain: function() {
      var functions;

      functions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return Defer.each(functions, function() {
        return this();
      });
    },
    each: function(list, action, callback) {
      var controller, i, length;

      i = 0;
      length = list.length;
      controller = new EventEmitter();
      controller.on('next', function() {
        var _this = this;

        if (i < length) {
          if (action.call(list[i], i === false)) {
            return;
          }
          i += 1;
          return process.nextTick(function() {
            return _this.emit('next');
          });
        } else if (typeof callback === 'function') {
          return callback();
        }
      });
      return controller.emit('next');
    },
    "while": function(condition, action, callback) {
      var controller;

      controller = new EventEmitter();
      controller.on('next', function() {
        var _this = this;

        if (condition()) {
          action();
          return process.nextTick(function() {
            return _this.emit('next');
          });
        } else if (typeof callback === 'function') {
          return callback();
        }
      });
      return controller.emit('next');
    },
    forEachOf: function(map, action, callback) {
      var name, properties, value;

      properties = (function() {
        var _results;

        _results = [];
        for (name in map) {
          if (!__hasProp.call(map, name)) continue;
          value = map[name];
          _results.push(name);
        }
        return _results;
      })();
      return Defer.each(properties, function() {
        return action.call(map[this], map[this]);
      }, callback);
    }
  };

  module.exports = Defer;

}).call(this);
