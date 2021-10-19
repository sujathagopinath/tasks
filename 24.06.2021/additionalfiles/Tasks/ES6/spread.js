window.onload = function () {
    //concat()
    //     var num1 = [1, 2, 3];
    //     var num2 = [4, 5, 6];

    //     var num3 = [...num1,..num2]; //spreads the value equally to one dimensonal array
    //     console.log(num2);
    // }

    //copy method

    // var arr =['a','b','c'];
    // var arr1 =arr;
    // console.log(arr1);
    //}

    //var arr =['a','b','c'];
    // var arr1 =[...arr];
    //console.log(arr);
    //arr1.push('d');
    // console.log(arr1);
    //conole.log(arr);   //original array will not affected we alter new array
    //}



    var num = [1, 2, 3];

    function add(a, b, c) {
        console.log(a + b + c);

    }
    add(...num);
}



