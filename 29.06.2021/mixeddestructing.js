let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    search: ['google', 'yahoo']
};

let {
    loc: { start },
    search: [...rest],
    loc: { end }
} = node;

console.log(start.line);        // 1
console.log(end.column);      // 1
console.log(rest);