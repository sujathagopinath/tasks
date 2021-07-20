const fs = require('fs');
fs.readFile('input.txt', 'utf-8', (err, data) => {
    console.log(data);
})
console.log("Reading file ...")