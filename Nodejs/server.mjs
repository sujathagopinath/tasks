import {createServer} from 'http';
const server = createServer((req, res) =>{
    res.end('hello Node\n');
});
server.listen(8081,() =>{
    console.log("server is running.....");
})