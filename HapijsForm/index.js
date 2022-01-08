const Hapi = require('@hapi/hapi');
const bunyan = require("bunyan");
const uuid = require("uuid");
const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4001,
    })
    
    // await server.register([
    //     {
    //         // plugin: require(""),
    //        plugin: require( 'hapi-account' ),
    //         options: {
    //             logger: bunyan.createLogger({
    //                 name: 'hapi-logger',
    //                 serializers: bunyan.stdSerializers,
    //                 enableByDefault: false
    //             })
    //         }
    //     },
    // ])
    
    var routes = require('./routes/User');
    server.route(routes);


 await server.start();
    console.log('Server started at 4001')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();