// Array destructing

var search = ['google', 'yahoo', 'twitter', 'facebook', 'linkedin'];

// var first = search[0];  basic method
// console.log(first);

// var [first, second, third] = search;
// var [first, second, , fourth] = search;
var [first, second, ...rest] = search;

console.log(first);
console.log(second);
// console.log(third);
// console.log(fourth);
console.log(rest);

//destructing Assignment

fruits = ['apple', 'mango', 'grapes'];
firstone = 'banana';
secondone = 'orange';

// var [firstone, secondone] = fruits;
console.log(firstone, secondone);

//function destructing

function operations(a, b) {
    return [a + b, a - b, a * b, a / b];
}
var [add, sub, ...rest] = operations(5, 6);
console.log(add);
console.log(...rest);

//object destructing

var food = {
    burger: "MCdonalds",
    coffee: 'starbucks'
}

var { burger: newburger, coffee: newcoffee } = food;
// var { burger, coffee } = food;
console.log(newburger, newcoffee);
// console.log(burger, coffee);