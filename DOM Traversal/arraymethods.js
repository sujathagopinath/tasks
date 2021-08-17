//To string

const programming = ["c", "python", "java", "C++", "Perl", "ruby"];
console.log("ToString:", programming.toString());
console.log("Joins:", programming.join("*"));
console.log("Pop:", programming.pop());   //removes last element from array return popped out elements
console.log("Push:", programming.push("C sharp")); // returns the length of array
console.log("ToString:", programming.toString());
console.log("Shifting:", programming.shift());  //removes the first element from array
console.log("ToString:", programming.toString());
console.log("Unshifting:", programming.unshift("javascript")); //Acts like a push
console.log("ToString:", programming.toString());
console.log("Changeofposition:", programming[1] = "Dotnet"); //removes the data in add in that position
console.log("ToString:", programming.toString());
console.log("splice:", programming.splice(2, 0, "python", "c")); //2=> position where new elements are adding 0=> how many elements should be removed
console.log("ToString:", programming.toString());
const newarray = programming.slice(1);
console.log("Slicingofnewarray:", newarray);
console.log("sorting:", newarray.sort())

//object arrays sort()

const cars = [
    { types: "volvo", year: 2020 },
    { types: "BMW", year: 2015 },
    { types: "Audi", year: 2021 },
]

console.log("sortingObjects:", cars.sort(function (a, b) {
    return a.year - b.year
}));




