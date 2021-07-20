/*const http = require("http");

require("dotenv").config();
//require('dotenv').config({path:path/filename});
//{path:path/filename} instead of using path path/filename it can be used through .env file

//process.env.port
//creating a server
/*const http = require("http");
const server= http.createServer((req,res)=>{
    res.end('you did');
});
server.listen(8080,()=>{
    console.log("server is running");
})*/

/*let port = process.env.PORT;
let host = process.env.HOST;

let server = http.createServer((req,res)=>{
    console.log('Thanks for the request');
    res.writeHead(200,{'content-Type':'text/plain'});
    res.end('you did');
});

server.listen(port ,host, ()=>{
    console.log(`server is running ${host}:${port}`);
});*/


const http = require("http");

require("dotenv").config();
//{path: path/filename}

//process.env.PORT
let port = process.env.PORT;
let host = process.env.HOST;

let server = http.createServer((req, res) => {
  console.log("Thanks for the request");
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("You Rock");
});

server.listen(port, host, () => {
  console.log(`Server is listening ${host}:${port}`);
});