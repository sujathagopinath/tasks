const Hapi = require('@hapi/hapi')

// const init = async () => {
//     const server = Hapi.server({
//         port: 7000,
//         host:'localhost'
//     })

//     server.route([
//         {
//             path:'/home',
//             method: 'GET',
//             handler: (req, res) => {
//                 return 'Hello Am a test'
//             }
           
//         }
//     ])
//     await server.start();
//     console.log('server is started at 7000')
// }
// process.on('unhandledRejection', (err) => {
//     console.log(err)
//     process.exit(1)
// })

// init();

const routes = require( "./routes" );

const app = async config => {
   const { host, port } = config;

   // create an instance of hapi
   const server = Hapi.server( { host, port } );

   // store the config for later use
   server.app.config = config;

   // register routes
   await routes.register( server );

   return server;
};

module.exports = app;