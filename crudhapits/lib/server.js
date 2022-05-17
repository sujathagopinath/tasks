"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("@hapi/hapi");
const HapiSwagger = __importStar(require("hapi-swagger"));
const poolPromise = require("./database");
const Routes = require('./routes');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Redis = require('ioredis');
const jwt = require('hapi-auth-jwt2');
const db = require('./database');
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        port: 3000,
        host: 'localhost'
    });
    const swaggerOptions = {
        info: {
            title: 'Test API Documentation'
        }
    };
    function getpool() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = yield db.poolPromise;
            const result = yield pool.request();
            return result;
        });
    }
    yield server.register([
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
    ]);
    const validate = (empid, req, h) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield getpool();
        const userdata = yield result.query(`select * from employees where empid = ${empid}`);
        console.log("data", userdata);
        if (!userdata) {
            return { valid: false };
        }
        return { valid: true, credentials: userdata };
    });
    server.auth.strategy('jwt', 'jwt', {
        key: 'SECRET',
        validate,
        verifyOptions: { algorithms: ['HS256'] }
    });
    server.auth.default('jwt');
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
        redis.on('error', (err) => console.log(err));
        return redis;
    }
    connectRedis();
    poolPromise;
    yield server.start();
    console.log('Server running on %s', server.info.uri);
    server.route(Routes);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
