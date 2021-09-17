const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const userModel = require('./models/User')
const dbConnect = require('./config/dbConnect')
dbConnect();

const server = Hapi.server({
    host: 'localhost',
    port: 4000,
})


server.route({
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
        try {
            var user = new userModel(request.payload);
            var result = await user.save()
            return h.response(result)
        } catch (error) {
            return h.response(error).code(500)
        }
    },

    options: {
        validate: {
            payload: Joi.object({
                firstname: Joi.string().min(2).max(5).required(),
                lastname: Joi.string().min(5).max(15).uppercase().required(),
                password: Joi
                    .string()
                    .required()
                    .custom((value, helper) => {

                        if (value.length < 8) {
                            return helper.message("Password must be at least 8 characters long")

                        } else {
                            return true
                        }
                    }),
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

// server.route({
//     method: 'GET',
//     path: '/user',
//     handler: async (request, h) => {
//         try {

//         } catch (error) {

//         }
//     }
// })

const init = async () => {
    await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();