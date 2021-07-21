// const url = require('url');
// const myURL =
//     URL.parse('https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash');

// console.log(myURL.host);
// console.log(myURL.pathname);
// console.log(myURL.search);

const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const urlobject = url.parse(req.url, true);
    const fileName = "." + urlobject.pathname;
    fs.readFile('demourl.html', function (err, data) {
        res.writeHead(200, { 'content-Type': 'text/html' })
        res.write(data);
    })

})
server.listen(6000, () => {
    console.log('server is running @ 6000');
})
