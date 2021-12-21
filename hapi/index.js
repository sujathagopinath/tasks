// const hapi = require('hapi');
// const Joi = require('joi');
// const { options } = require('joi')
'use strict';

const hapi = require('@hapi/hapi');
const Joi = require("@hapi/joi")
const inert = require("@hapi/inert")


const server = hapi.server({
    port: 8080,
    host: 'localhost'
})

//Plugin

server.register({
    plugin: inert,
    options: {
        enableByDefault: true
    }
    // }, (err) => {
    //     if (err) {
    //         throw (err)
    //     }
})
server.route({
    method: 'GET',
    path: '/file.js',
    handler: (request, h) => {
        return h.file('public/js/file.js')
    }
})


// const getDate = {
//     name: 'getDate',
//     version: '1.0.0',
//     register: async function (server, options) {

//         const currentDate = function () {

//             // const date = 'Hello ' + options.name + ', the date is ' + new Date();
//             const date = 'Hello ' + ', the date is ' + new Date();
//             return date;
//         };
//         await server.register({
//             plugin: getDate

//         })
//         server.decorate('toolkit', 'getDate', currentDate);
//     }
// };



server.route({
    path: '/',
    method: 'GET',
    handler: (req, res) => {
        return 'Hello, world!';
    }
})

server.route({
    path: '/getmethod/{name}',
    method: 'GET',
    handler: (req, res) => {
        const name = req.params.name;
        return `Hi ${name}`
    }
})

server.route({
    method: 'POST',
    path: '/postmethod',
    handler: (request, h) => {

        const name = request.payload.name;
        return `Hello ` + name;
    }
});


server.route({
    method: 'POST',
    path: '/signup',
    handler: (request, h) => {

        const payload = request.payload;
        return `Welcome ${payload.username}!`;
    },
    options: {
        validate: {
            payload: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().min(3).max(30).required()
            })
        }
    }
});



const start = async () => {
    await server.start()
    console.log("server started")
}

start();