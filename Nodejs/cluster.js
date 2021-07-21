const cluster = require('cluster');
const http = require('http');
const { pid } = require('process');
const numcpus = require('os').cpus()

if (cluster.isMaster) {
    console.log('This is the master process', pid);
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
    for (let i = 0; i < numcpus.length; i++) {
        cluster.fork();
    }
}
else {

    http.createServer((req, res) => {
        const message = `worker: ${pid}`;
        console.log(message);
        res.end(message);

    }).listen(2500, () => {
        console.log("Server is running at 2500");
    })
}