/*var counter = function(arr){
    return 'there are '+arr.length+ ' elements in the array';

};

module.exports = counter;*/

//using variables

/*var counter = function(arr){
    return 'there are '+arr.length+ ' elements in the array';

};

var adder = function(a,b){
    return `The sum of the 2 numbers is ${a+b}`;
};
 var pi =3.14;

module.exports.counter = counter;
module.exports.adder = adder;
module.exports.pi = pi;*/

module.exports.counter = function(arr){
    return 'there are '+arr.length+ ' elements in the array';

};

module.exports.adder = function(a,b){
    return `The sum of the 2 numbers is ${a+b}`;
};
module.exports.pi =3.14;

/* module.exports = {
    counter: counter,
    adder:adder,
    pi:pi
};
 */