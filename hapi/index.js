const hapi = require('hapi');
const Joi = require('joi');
// const { options } = require('joi')

const server = hapi.server({
    port: 8080,
    host: 'localhost'
})

const getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function () {

            // const date = 'Hello ' + options.name + ', the date is ' + new Date();
            const date = 'Hello ' + ', the date is ' + new Date();
            return date;
        };
        await server.register({
            plugin: getDate

        })
        server.decorate('toolkit', 'getDate', currentDate);
    }
};



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
        //     auth: false,
        validate: {
            payload: {
                username: Joi.string().min(1).max(20),
                password: Joi.string().min(7)
            }
        }
    }
});

const start = async () => {
    await server.start()
    console.log("server started")
}

start();