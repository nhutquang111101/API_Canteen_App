const {add, minus} = require('./operator');

const util = require('util');


var a = 3;
var b = 1;
console.log(util.format('%d+%d=%d', a, b, add(a,b)));
console.log(util.format('%d-%d=%d', a, b, minus(a,b)));