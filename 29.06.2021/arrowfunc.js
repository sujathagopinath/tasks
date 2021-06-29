// var data = () => {
//     console.log("hello");
// }
// data();

//if it has the single statement to run we can remove curly braces

// var data = () => console.log("Arrowfunction");
// data();

//string template if we are passing one parameter then we can remove brackets

// var data = name => console.log(`riya says ${name}`);
var data = (name) => console.log(`riya says ${name}`);
data("madhu");

var data = {
    string: "riya",
    details(x) {
        setInterval(() => {
            if (x > 0) {
                console.log(this.string + " Your data is saved");
                x--;
            }
        }, 1000);
    }
};

data.details(3);













