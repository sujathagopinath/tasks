const f = function(){
    //statements
}

f(); //called functions

// function as an object property

const o ={
    name:"Anonymous function",
    invoke:function(){
        return "you called me";
    }
};

console.log(o.invoke()); //call function using object property
