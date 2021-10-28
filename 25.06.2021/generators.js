function *generators(){
    yield 22;
    console.log("First element");
    yield 33;
}

let gen = generators();
//gen.next();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

/*function *test(){
    const x = 1 +(yield 5);
    console.log("First yield called");
}

let tes = test();
tes.next();
tes.next();
*/