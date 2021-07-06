function iterator(arr) {
    let i = -1;
    return {
        next: function () {
            ++i;
            return {
                done: i >= arr.length,
                value: arr[i]
            }
        }
    }

}
const n = [1, 4, 9];

const iter = iterator(n);

console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());