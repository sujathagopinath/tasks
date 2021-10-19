const newmap = new Map();

let obj = { a: 1 }

newmap.set(obj, "This is a new Map");

console.log(newmap);

//function 

function sample() { console.log('hello') }

newmap.set(sample, 'This is a function');

console.log(newmap);


