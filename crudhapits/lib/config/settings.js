"use strict";
const dotenv = require("dotenv");
dotenv.config();
// import { env } from "process";
exports.dbConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    driver: process.env.DRIVER,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};
// const convict = require('convict');
// // const configure = require('./configure.json')
// const fs = require('fs')
// var config = convict({
//     env: {
//         format: ['production', 'development'],
//         default: 'development',
//         env: 'NODE_ENV',
//         doc: 'The environment that we\'re running in.'
//     },
//     dbs: {
//         db1: {
//             host: {
//                 doc: 'Database host name/IP',
//                 format: '*',
//                 default: 'server1.dev.test'
//             },
//             user: {
//                 doc: 'Database Username',
//                 format: String
//             },
//             pass: {
//                 doc: 'Database password',
//                 format: String,
//                 sensitive: true
//             },
//             name: {
//                 doc: 'Database name',
//                 format: String,
//                 default: 'users'
//             }
//         },
//     }
// });
// console.log(config.dbs)
// // Load environment dependent configuration
// config.loadFile('./config/' + env + '.json');
// // Perform validation
// config.validate({ allowed: 'strict' });
// module.exports = config.getProperties();
