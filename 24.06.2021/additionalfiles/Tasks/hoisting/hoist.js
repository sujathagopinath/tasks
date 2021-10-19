// var x;
// var y;
// var z;

var a = { name: 'suja' }

function test() {
    console.log(a.name);

}
test();

var x;
const y = 'hello';
let z = 456;

// x;
// y='hello';
// z=456;

//function hoisting

function test1() {
    console.log('hello');
}
test1();

var x = function () {
    console.log('hi');
}