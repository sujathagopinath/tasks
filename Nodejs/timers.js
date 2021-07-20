/*setTimeout(() => {
    
 console.log("hello after 4 seconds");
},
4*1000
);*/

//using Function

/*const func = ()=>{
    console.log("hello after 4 seconds");
};

setTimeout(func,4*1000);
*/

//for: func(arg1,arg2,arg3...)

//we can use setTimeout(func, delay,arg1,arg2...)

//using function and argument

const func = here => {
    console.log(here + 'func');
};

setTimeout(func, 2 * 1000, "data");

//using delay and one function to print

const theOnefunc = delay => {
    console.log("hello after" + delay + "seconds");
};

setTimeout(theOnefunc, 4 * 1000, 4);
// setTimeout(theOnefunc,8*1000,8);