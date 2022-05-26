"use strict";
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
exports.redis = void 0;
const hapi_1 = require("@hapi/hapi");
const settings_1 = require("./config/settings");
const poolPromise = require("./database");
const Redis = require('ioredis');
const db = require('./database');
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new hapi_1.Server({
        host: settings_1.dbConfig._instance.hapi.host,
        port: settings_1.dbConfig._instance.hapi.port,
    });
    yield server.register([
        require('./plugins/index')
    ]);
    poolPromise;
    yield server.start();
    console.log('Server running on 4000');
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
exports.redis = new Redis({
    host: settings_1.dbConfig._instance.redis.host,
    port: settings_1.dbConfig._instance.redis.port,
});
exports.redis.on('connect', () => console.info('Successfully connected to Redis'));
exports.redis.on('error', (err) => console.log(err));
