const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const userModel = require('./models/User')
const mongoose = require('mongoose')
// const dbConnect = require('./config/dbConnect')
// dbConnect();

mongoose.connect(
    "mongodb://localhost:27017/validation", {
    useNewUrlParser: true
}).then(() => {
    console.log("DB Connected")
}).catch((error) => {
    console.log(error)
})


const server = Hapi.server({
    host: 'localhost',
    port: 4000,
})

server.route({
    method: 'POST',
    path: '/signup',
    handler: async (request, h) => {
        try {
            const { username, email, password, phonenumber } = request.payload
            const userExist = await userModel.findOne({ email: email })
            if (userExist) {
                return 'User has already taken'
            }
            const usercreated = await userModel.create({ username, password, email, phonenumber })
            const result = await usercreated.save()
            return h.response(result).code(200);
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    options: {
        validate: {
            payload: Joi.object({
                username: Joi.string().min(2).max(10).required(),
                email: Joi.string().min(6).required().email(),
                password: Joi
                    .string()
                    .regex(/^[a-zA-Z0-9]{5,10}$/)
                    .required(),
                phonenumber: Joi
                    .string()
                    .regex(/^[7-9]\d{9}$/)
                    .required()
            }),

            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        }
    }
})

server.route({
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {

    }
})

server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: async (request, h) => {
        try {
            const people = await userModel.findById(request.params.id)
            console.log("params", request.params)
            return h.response(people)
        } catch (error) {
            return h.response(error).code(500)
        }
    }
})

server.route({
    method: 'PUT',
    path: '/update/{id}',
    handler: async (request, h) => {
        try {
            const person = await userModel.findByIdAndUpdate(request.params.id, request.payload)
            return h.response(person)
        } catch (error) {
            return h.response(error).code(500)
        }
    },
    options: {
        validate: {
            payload: Joi.object({
                username: Joi.string().optional(),
                phonenumber: Joi.string().regex(/^[7-9]\d{9}$/).required()

            }),
            failAction: (request, h, error) => {
                return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
            }
        }
    }
})


const init = async () => {
    await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();