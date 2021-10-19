var stringProperty = 'Hello world';
const myObject = {
    stringProperty: stringProperty,
    numProperty: 2,
    booleanProperty: false,
    images: ["smile.gif", "grim.gif"],
    data: function (x) {
        console.log(`you saved the data ${x} times`);
    },



    pos: {        //nested object literal
        x: 40,
        y: 300,

    },
};

console.log(myObject.stringProperty);
console.log(myObject.numProperty);
console.log(myObject.booleanProperty);
console.log(myObject.images[1]);

console.log(myObject.data(10));

console.log(myObject.pos.x);
console.log(myObject.pos.y);