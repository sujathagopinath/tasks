//function which can be exited and later re-entered

function *add(){
    const x = 1 + (yield 2);
    
    console.log(x);

}
const it =add()
console.log(it.next());
console.log(it.next());
//it.next();