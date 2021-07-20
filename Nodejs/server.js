const http = require('http')
const server = http.createServer((req, res) => {
    res.end("hello world");
    //res.end();

})

server.listen(3000, (req, res) => {
    console.log("server is running");
})

/*import {createServer} from 'http';
const server = createServer((req, res) =>{
    res.end('hello Node\n');
});
server.listen(8081,() =>{
    console.log("server is running.....");
})
*/
























