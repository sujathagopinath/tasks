/*var counter = require('./ctsofmodule');

console.log(counter(['aaa','bbb','ccc']));*/


var ctsofmodule = require('./ctsofmodule');
console.log(ctsofmodule.counter(['aaa','bbb','ccc']));
console.log(ctsofmodule.adder(5,6));
console.log(ctsofmodule.adder(ctsofmodule.pi,5));