//REST and SPREAD

//const PI = Math.PI;
//const E = Math.E;
//const SQRT2 = Math.SQRT2;

//3,4,5 is equivalent to 8th line
const {PI, E, SQRT2} = Math;

const  {readFile} = require('fs');

const circle ={
    radius:2,
    someProp :'somevalue',
};

const circleArea = (circle)=>{
    return (PI * circle.radius * circle.radius).toFixed(2);
}

console.log(circleArea(circle));