const Hapi = require('@hapi/hapi')
// const routes = require( "./routes" );

const app = async config => {
   const { host, port } = config;

   const server = Hapi.server( { host, port } );

   server.app.config = config;

   // register routes
   await routes.register( server );

   return server;
};

module.exports = app;