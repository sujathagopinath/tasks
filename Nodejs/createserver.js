/*const aaa = require("http"); //get post put patch and delete
//import {createServer} from 'http';
//import http from 'http';

const server = aaa.createServer( function (req, res){
    res.end('hello world\n');
});

server.listen(5000,() =>{
    console.log("server is running.....");
})*/

// setTimeout(() => {

//     console.log("hello after 4 seconds");
//    },
//    4*1000
//    );


// const http = require('http')

// const port = process.env.PORT || 4000

// const server = http.createServer((req, res) => {
//     res.statusCode = 200
//     res.setHeader('Content-Type', 'text/html')
//     res.end('<h1>Hello, World!</h1>')
// })

// server.listen(port, () => {
//     console.log(`Server running at port ${port}`)
// })



const https = require('https')
const options = {
    hostname: 'reqres.in',
    port: 443,
    path: '/todos',
    method: 'POST',
    // statusCode: 200
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
        process.stdout.write(d)
    })
})

req.on('error', error => {
    console.error(error)
})

req.end()