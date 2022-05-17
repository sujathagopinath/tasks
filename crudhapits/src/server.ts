import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import * as HapiSwagger from 'hapi-swagger';
const poolPromise = require("./database");
const Routes = require('./routes')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const Redis = require('ioredis');
const jwt = require('hapi-auth-jwt2');
const db = require('./database')

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

    async function getpool() {
        const pool = await db.poolPromise;
        const result = await pool.request();
        return result;
    }


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
        },
        {
            plugin: jwt
        },
        {
            plugin: require('hapi-server-session'),
            options: {
                cookie: {
                    isSecure: false
                }
            }
        }
    ])

    const validate = async (decoded: any, req: Request, h: ResponseToolkit) => {
        const result = await getpool();
        const userdata = await result.query(
            `select * from employees where empid = ${decoded.empid}`
        );
        console.log("data", userdata);
        if (!userdata) {
            return { valid: false };
        }

        return { valid: true, credentials: userdata };
    }

    server.auth.strategy('jwt', 'jwt',
        {
            key: 'SECRET',
            validate,
            verifyOptions: { algorithms: ['HS256'] }
        }
    );

    server.auth.default('jwt')

    // server.auth.strategy("session", "cookie", {
    //     cookie: {
    //         password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
    //         isSecure: false,
    //     },
    // });
    // server.auth.default("session");

    // const redis = new Redis({
    //     host: 'ASPIREVM12-24',
    //     port: 6379,
    // });
    // redis.set('foo', 'bar');
    // redis.get('foo', (err: any, reply: any) => {
    //     if (err) throw err;
    //     console.log('foo', reply);
    // });


    // const startupNodes = [
    //     {
    //         port: 6380,
    //         host: "127.0.0.1",
    //     },
    //     {
    //         port: 6381,
    //         host: "127.0.0.1",
    //     },
    // ];
    // const options = {
    //     slotsRefreshTimeout: 2000,
    //     dnsLookup: (address: any, callback: any) => callback(null, address),
    //     redisOptions: {
    //         tls: {},
    //         // password:foobared,
    //     },
    // };
    // const cluster = new Redis.Cluster(startupNodes, options);
    // console.log(cluster);

    // const cluster = new Redis.Cluster([
    //     {
    //         host: '127.0.0.1',
    //         port: 7000,

    //     },
    //     {
    //         host: '127.0.0.1',
    //         port: 7001,

    //     },
    //     {
    //         host: '127.0.0.1',
    //         port: 7002,

    //     }
    // ])
    // console.log('clusters', cluster.nodes())


    // Redis client
    function connectRedis() {
        const redis = new Redis({
            host: 'ASPIREVM12-24',
            port: 6379,
        });
        // Notifications for redis connection
        redis.on('connect', () => console.info('Successfully connected to Redis'));
        redis.on('error', (err: any) => console.log(err));

        return redis;
    }
    connectRedis();

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
