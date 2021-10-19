// const myset = new Set();
// myset.add(1);
// myset.add(2);
// myset.values()
// console.log(myset);

// let item = myset.entries();

// console.log(item.next().value)
// console.log(item.next().value)


function getrandom() {
    return Math.round(Math.random(10) * 10);
}

const newset = new Set();
while (newset.size < 10) {
    newset.add(getrandom());
}
console.log(newset);

//weak set 

let carweak = new WeakSet();

let car = {
    make: 'honda',
    model: 'civic'
}
carweak.add(car);
console.log(carweak);
console.log(car);








