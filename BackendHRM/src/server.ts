import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { dbConfig } from "./config/settings";
const poolPromise = require("./database");
const Redis = require('ioredis');
const db = require('./database');

const init = async () => {
    const server: Server = new Server({
        host: dbConfig._instance.hapi.host,
        port: dbConfig._instance.hapi.port,
    });

    await server.register([
        require('./plugins/index')
    ])

    poolPromise
    await server.start();
    console.log('Server running on 4000');
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();

export const redis = new Redis({
    host: dbConfig._instance.redis.host,
    port: dbConfig._instance.redis.port,
});

redis.on('connect', () => console.info('Successfully connected to Redis'));
redis.on('error', (err: any) => console.log(err));
