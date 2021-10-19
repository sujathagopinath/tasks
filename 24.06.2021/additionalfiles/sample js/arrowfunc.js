const f1 = function(){return "helloworld";}

//using Arrow function
const f1 = ()=>"helloworld";

//using argument
const f2 = function(arg1){return `value of the arg:${arg1}`;}

//using arrowfunction argument
const f2 = arg1 =>`value of the argument:${arg1}`;

// using two argument
const f3 = function(arg1,arg2){return arg1*arg2;}

//using => with two arguments
const f3 = (arg1,arg2) => arg1*arg2;

/* This keyword */

const obj={
    name:"Daily",
    Magic(){
        return `hello ${this.name}`; 
    }
};

//call magic method
console.log(obj.Magic());

const m1 = obj.Magic;
console.log(m1==obj.Magic);

console.log(m1()); //It will not take the value from this keyword returns only hello