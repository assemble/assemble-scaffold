
var Scaffold = require('scaffold');
var scaffold = new Scaffold({
  files: ['*.js']
});
scaffold.isScaffold = true;

var isPlainObject = require('is-plain-object');

function isScaffold(obj) {
  return !isPlainObject(obj) && obj.isScaffold === true;
}

console.log(isScaffold(scaffold))
