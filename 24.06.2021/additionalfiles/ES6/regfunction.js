// var data = function () {
//     console.log("hello world");
// }
// data();

// var data = function () {
//     console.log("regular function");
// }
// data();

// var data = function (name) {
//     console.log(`riya says ${name}`);
// }
// data("madhu");

var data = {
    String: "riya",
    detail(x) {
        var self = this;
        setInterval(function () {
            if (x > 0) {
                console.log(self.String + " your data is saved");
                x--;
            }
        }, 1000);
    }

};
data.detail(5)