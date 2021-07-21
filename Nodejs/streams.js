// var fs = require('fs');
// var http = require('http');

// http.createServer((req, res) => {
//     fs.readFile('newfile.txt', (error, data) => {
//         if (error) {
//             console.log('Error', error);
//         }
//         res.writeHeader(200, { 'content-type': 'text/plain' });
//         res.end(data);
//     })
// }).listen(2000, () => {
//     console.log('Streaming is running ...')
// })

// process.stdin.pipe(process.stdout);

// const { passThrough } = require('stream');
// const passThrough = new passThrough();

// process.stdin.pipe(passThrough).pipe(process.stdout);

// const fs = require('fs');

// const outputStream = fs.createWriteStream('file.txt');
// process.stdin.pipe(outputStream)


// const fss = require('fs');

// const inputStream = fss.createReadStream('file.txt');
// process.stdin.pipe(inputStream)

const { Transform, pipeline } = require('stream');

const Uppercase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
})

pipeline(process.stdin, Uppercase, process.stdout, err => {
    if (err) {
        console.log("Pipeline got an error", err)
    }
})

// const { PassThrough, pipeline } = require('stream');
// const fs = require('fs');

// const input = fs.createReadStream('file.txt');
// const output = fs.createWriteStream('out.txt');

// const passThrough = new PassThrough();

// console.log("Starting pipeline...");
// pipeline(input, PassThrough, output, err => {
//     if (err) {
//         console.log("Pipeline failed with an error: ", err);
//     }
//     else {
//         console.log("Pipeline ended successfully");
//     }
// })