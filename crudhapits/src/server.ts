import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import * as HapiSwagger from 'hapi-swagger';
const poolPromise = require("./database");
const Routes = require('./routes')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')

const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });
    const swaggerOptions: HapiSwagger.RegisterOptions = {
        info: {
            title: 'Test API Documentation'
        }
    };

    // const swaggerOptions = {
    //     info: {
    //         title: 'Employees Data',
    //         version: '0.0.1'
    //     }
    // }
    await server.register([
        {
            plugin: Inert
        },
        {
            plugin: Vision
        },
        {
            plugin: require('hapi-pino'),
            options: {
                enabledByDefault: true
            }
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    poolPromise
    await server.start();
    console.log('Server running on %s', server.info.uri);
    server.route(Routes)
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
