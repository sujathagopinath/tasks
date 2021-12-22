"use strict";

const server = require("./server");
const config = require('./config')

const startServer = async () => {
   try {
    
    //    create an instance of the server application
       const app = await server( config );

       // start the web server
       await app.start();
       console.log("API")
       console.log( `Server running at http://${ config.host }:${ config.port }...` );
   } catch ( err ) {
       console.log( "startup error:", err );
   }
};

startServer();