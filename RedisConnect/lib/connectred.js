"use strict";
// const redis = require('redis')
// const connectRedis = require('connect-redis');
// // const RedisStore = connectRedis();
Object.defineProperty(exports, "__esModule", { value: true });
// const client = redis.createClient({
//     host: "localhost",
//     port: 6379,
// })
// client.on('error', (error: any) => {
//     console.log('test')
// })
// // client.set('foo', 'bar', (err: any, reply: any) => {
// //     if (err) throw err;
// //     console.log(reply);
// //     client.get('foo', (err: any, reply: any) => {
// //         if (err) throw err;
// //         console.log(reply);
// //     });
// // });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const redis = require("redis");
client.connect();
client.on("error", function (error) {
    console.error(error);
});
client.set("key", "value", redis.print);
// client.get("key", redis.print);
