/*!
 * assemble-scaffold <https://github.com/jonschlinkert/assemble-scaffold>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isScaffold = require('is-scaffold');

module.exports = function assembleScaffold(options) {
  options = options || {};
  options.expand = true;

  return function (app) {
    if (!app || !isApp(app)) {
      throw new Error('expected an instance of an assemble-compatible application.');
    }

    app.define('scaffold', function (name, config) {
      if (!config && typeof name === 'string') {
        var res = this.scaffolds[name];
        if (typeof res === 'function') {
          return res;
        }
        return res;
      }

      if (typeof config === 'function') {
        this.scaffolds[name] = config.bind(this);
        return this;
      }

      var Scaffold = options.Scaffold || this.get('Scaffold') || require('scaffold');
      config.expand = true;

      var scaffold = new Scaffold(name, config);

      scaffold.use = function (fn) {
        fn.call(this, this);
        return this;
      };

      scaffold.generate = function (dest/*, cb*/) {
        var args = [].slice.call(arguments);
        if (typeof dest === 'string') {
          dest = args.shift();
          this.options.dest = dest;
        }
        args.unshift(this);
        return app.generate.apply(app, args);
      };

      this.scaffolds[name] = scaffold;
      return this;
    });
  };
};

function isApp(val) {
  return ('extendView' in val)
    && ('extendViews' in val)
    && ('viewTypes' in val);
}
