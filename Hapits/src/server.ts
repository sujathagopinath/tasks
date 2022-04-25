'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";

export let server: Server;

export const init = async function (): Promise<Server> {
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: 'localhost',
    });

    // Routes will go here
    function index(request: Request): string {
        console.log("Processing request", request);
        return "Hello!.";
    }
    server.route([
        {

            method: "GET",
            path: "/",
            handler: index
        },
        {
            method: ["GET", "POST"],
            path: "/method",
            handler: (request: Request, reply: any) => {
                return ("Got " + request.method + " method");
            }

        },
        {

            method: "GET",
            path: "/questions/{id}",
            handler: (request: Hapi.Request, reply: any) => {
                return ("Question requested is: " + request.params.id);

            }
        },
        {
            method: "GET",
            path: "/users/{userId?}",
            handler: (request: Hapi.Request, reply: any) => {
                if (request.params.userId) {
                    return ("user id is: " + request.params.userId)
                } else {
                    return ("will show user collection");
                }
            }
        }
    ])
    return server;

};

export const start = async function (): Promise<void> {
    console.log("Listening on port 4000");
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});