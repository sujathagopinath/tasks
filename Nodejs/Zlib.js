const zlib = require('zlib');
const fs = require('fs');

const gzip = zlib.createGzip();

const input = fs.createReadStream('input.html');
const output = fs.createWriteStream('input.html.gz');

input.pipe(gzip).pipe(output);