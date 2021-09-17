const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const path = require('path')
// const User = require('./User')
// const dbConnect = require('./dbConnect');
const mongoose = require('mongoose')
// dbConnect();


const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 1234,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'static')
            }
        }
    })

    await server.register([
        {
            plugin: require("hapi-geo-locate"),
            // plugin: require("@hapi/inert"),
            options: {
                enableByDefault: false
                // enableByDefault: true
            }
        },
        {
            plugin: require('@hapi/inert')
        }
    ])

    mongoose.connect(
        "mongodb://localhost:27017/Hapijs", {
        useNewUrlParser: true
    })

    const User = mongoose.model("users", {
        username: String,
        password: String,
    });

    server.route({
        method: "POST",
        path: "/login",
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
                }
            }
        },
        handler: async (request, h) => {
            try {
                let user = new User(request.payload);
                console.log("request", request.payload)
                console.log("users", user)

                var result = await user.save()
                return h.response(result)
            } catch (error) {
                return h.response(error).code(500)
            }
        },


    })

    server.route([
        {
            method: 'GET',
            path: '/static',
            handler: (request, h) => {
                return h.file('sample.js')
            },
            // options: {
            //     files: {
            //         relativeTo: path.join(__dirname, 'static')
            //     }
            // }
        },

        {
            method: 'GET',
            path: '/download',
            handler: (request, h) => {
                return h.file('sample.js', {
                    mode: 'attachment',
                    filename: 'newsample.js'
                })
            },
        },

        {
            method: 'GET',
            path: '/location',
            handler: (request, h) => {
                console.log(request)
                if (request.location) {
                    return request.location
                }
                else {
                    return 'Location is not enabled by default'
                }
            }
        },

        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return h.file('test.html')
            }
        },

        {
            path: '/getmethod/{name?}',
            method: 'GET',
            handler: (request, res) => {
                const name = req.params.name;
                return `Hi ${name}`
                // return `${request.query.name}`
            }
        },

        {
            method: 'GET',
            path: '/{any*}',
            handler: (request, h) => {
                return 'Oh No your not in the proper page search'
            }
        }
    ])

    await server.start();
    console.log('Server started at 1234')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();