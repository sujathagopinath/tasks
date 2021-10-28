function* generators() {
    yield 22;
    console.log("First element");
    yield 33;
}

let gen = generators();
//gen.next();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

