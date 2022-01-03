const Hapi = require('@hapi/hapi');
// var routes = require('./routes/User');
// server.route(routes.User);

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 8000,
    })

   
    var routes = require('./routes/User');
    server.route(routes);


 await server.start();
    console.log('Server started at 8000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();