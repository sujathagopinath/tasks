import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { Config } from "./environmentvariables/config";
import { Routes } from "./routes";
import { soapCall } from './soap'

const init = async () => {
    const server: Server = new Server({
        host: Config.get('hapi').host,
        port: Config.get('hapi').port
    });


    soapCall
    await server.start();
    console.log('Server running on 8000');
    server.route(Routes)
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();


