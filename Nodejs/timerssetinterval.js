/*setInterval(
    ()=> console.log("AFter 3 seonds"),3000
);*/

//counter 
// let counter = 0;
// const interval = setInterval(() => {
//     console.log("hello world");
//     counter = counter + 1;

//     if(counter === 5){
//         console.log("Done");
//         clearInterval(interval);
//     }
// }, 1000);

//using increment of delay each time

const func = delay =>
    setTimeout(() => {
        console.log('Hello world ' + delay);
        func(delay + 1);
    }, delay * 1000);
func(1);