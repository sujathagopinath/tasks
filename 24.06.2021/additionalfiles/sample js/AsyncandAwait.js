//async function myfunc(){
  //  return Promise.resolve("Hello");
//}

//using Promise
async function myfunc(){
    return "Helloworld";
}
myfunc().then(
    function(value){sucess(value);},    //if its true
    function(error) {failure(error);}
);
