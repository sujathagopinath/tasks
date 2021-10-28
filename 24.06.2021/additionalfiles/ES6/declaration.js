window.onload = function () {
    //  var x = 10;
    // if (x > 5) {
    //     // var x = 6;
    //     let x = 6;
    //     console.log("inside: " + x);
    // }
    // console.log("outside: " + x);

    var data = document.getElementsByTagName('li');

    for (var x = 0; x < data.length; x++) {
        data[x].onclick = function () {
            console.log(x);
        }
    }
    console.log(x);
}