/*!
 * assemble-scaffold <https://github.com/jonschlinkert/assemble-scaffold>
 *
 * Copyright (c) 2015 .
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var Scaffold = require('scaffold');
var assemble = require('assemble');
var scaffold = require('./');

describe('scaffold', function () {
  it('should work as a plugin with assemble:', function () {
    var app = assemble()
      .use(scaffold())
    assert(typeof app.scaffold === 'function');
  });

  it('should register scaffolds on `app.scaffolds`:', function () {
    var app = assemble()
      .use(scaffold())

    app.scaffold('foo', {
      src: ['*.js'],
      dest: 'actual'
    });

    assert(typeof app.scaffold === 'function');
    assert(typeof app.scaffolds === 'object');
    assert(typeof app.scaffolds.foo === 'object');
    assert(Array.isArray(app.scaffolds.foo.files));
  });

  it('should take an instance of Scaffold:', function () {
    var app = assemble()
      .use(scaffold())

    var config = new Scaffold({
      src: ['*.js'],
      dest: 'actual'
    });

    app.scaffold('foo', config);

    assert(typeof app.scaffold === 'function');
    assert(typeof app.scaffolds === 'object');
    assert(typeof app.scaffolds.foo === 'object');
    assert(Array.isArray(app.scaffolds.foo.files));
  });

  it('should decorate a `generate` method onto registered scaffolds:', function () {
    var app = assemble()
      .use(scaffold())

    app.scaffold('bar', {
      src: ['*.js'],
      dest: 'actual'
    });

    assert(typeof app.scaffolds.bar === 'object');
    assert(typeof app.scaffolds.bar.generate === 'function');
  });

  it('should support registering a scaffold as a function:', function () {
    var app = assemble()
      .use(scaffold())

    app.scaffold('bar', function(options) {
      return new Scaffold({
        options: options || {},
        src: ['*.js'],
        dest: 'actual'
      })
    });

    assert(typeof app.scaffolds.bar === 'function');
    var config = app.scaffold('bar')({cwd: 'fixtures'});
    assert(Array.isArray(config.files));
  });

  it('should get a registered scaffold when one arg is passed:', function () {
    var app = assemble()
      .use(scaffold())

    app.scaffold('bar', {
      src: ['*.js'],
      dest: 'actual'
    });

    var config = app.scaffold('bar');

    assert(typeof config === 'object');
    assert(typeof config.generate === 'function');
  });

  it.skip('should generate a scaffold:', function () {
    var app = assemble()
      .use(scaffold())

    app.scaffold('bar', {
      src: ['*.js'],
      dest: 'actual'
    });

    app.scaffold('bar')
      .generate('dist/', function (err) {
        console.log(arguments)
      });

    assert(typeof config === 'object');
    assert(typeof config.generate === 'function');
  });

  it('should throw an error on invalid arguments:', function () {
    (function () {
      scaffold()();
    }).should.throw('expected an instance of an assemble-compatible application.');
    (function () {
      scaffold({})();
    }).should.throw('expected an instance of an assemble-compatible application.');
    (function () {
      scaffold({})({});
    }).should.throw('expected an instance of an assemble-compatible application.');
  });
});
