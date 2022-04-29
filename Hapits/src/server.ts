'use strict';

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import Joi from '@hapi/joi'

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

    const plugin: Hapi.Plugin<any> = {
        name: 'example',
        register: async (server, options) => {
            const bind = {
                message: 'hello'
            };
            server.bind(bind);
            server.route(
                {
                    method: 'GET',
                    path: '/plugin',
                    handler: (_, h: Hapi.ResponseToolkit) => {
                        return h.response({ up: true }).code(200)
                    },
                });
        }
    };
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
        },
        // {
        //     method: 'GET',
        //     path: '/',
        //     handler: (_, h: Hapi.ResponseToolkit) => {
        //         return h.response({ up: true }).code(200)
        //     },
        // }
        {
            method: 'POST',
            path: '/validate',
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().required(),
                        password: Joi.string().required(),
                    }),
                }
            },
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                try {
                    console.log("request", request.payload)
                } catch (error) {
                    return h.response(error).code(500)
                }
            },
        }
    ])
    server.register(plugin);
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
