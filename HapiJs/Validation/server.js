const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
const userModel = require('./models/User')
// const createUserSchema = require('./schemas/createUser');
const Jwt = require('hapi-auth-jwt')
const bcrypt = require('bcrypt')
const createToken = require('./utils/token')
const dbConnect = require('./config/dbConnect');
const secret = require('./config');
dbConnect();

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4000,
    })


    // var validate = function (request, decodedToken, callback) {
    //     console.log("id", decodedToken.id)
    //     var error,
    //         credentials = user[decodedToken.id] || {};

    //     if (!credentials) {
    //         return callback(error, false, credentials);
    //     }

    //     return callback(error, true, credentials)
    // };


    // await server.register({
    //     plugin: require('hapi-auth-jwt2'), function(error) {

    //         server.auth.strategy('token', 'jwt', {
    //             key: secret,
    //             validateFunc: validate,
    //             verifyOptions: { algorithms: ['HS256'] }  // only allow HS256 algorithm
    //         })
    //     }
    // })

    await server.register({
        plugin: require('hapi-auth-bearer-token')
    });
    server.auth.strategy('simple', 'bearer-access-token', {
        allowMultipleHeaders: true,              // optional, false by default
        validate: async (request, token, h) => {
            token = request.headers.authorization.split(' ')[1];
            console.log('token', token)
            const isValid = token
            const credentials = { token };
            return { isValid, credentials };
        }
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
                return h.response({ result, id_token: createToken(usercreated) }).code(200);
            } catch (error) {
                return h.response(error).code(500)
            }
        },

        options: {
            validate: {
                payload: Joi.object({
                    username: Joi
                        .string()
                        .min(2)
                        .max(10)
                        .required(),
                    email: Joi
                        .string()
                        .min(6)
                        .email()
                        .required(),
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
            try {
                const { email, password } = request.payload;
                const user = await userModel.findOne({ email: email })
                if (user && (await user.isPasswordMatch(password))) {
                    return h.response({ user, id_token: createToken(user) }).code(200);
                }
                else {
                    return h.response('Invalid login credentials').code(400)
                }
            } catch (error) {
                return h.response(error).code(500)
            }
        },
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi
                        .string()
                        .min(6)
                        .email()
                        .required(),
                    password: Joi
                        .string()
                        .regex(/^[a-zA-Z0-9]{5,10}$/)
                        .required(),
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
        config: {
            auth: 'simple'
        },
        handler: async (request, h) => {
            try {
                const people = await userModel.findById(request.params.id)
                // console.log("params", request.params)
                return h.response(people).code(200)
            }
            catch (error) {
                return h.response(error).code(500)
            }
        }
    })

    server.route({
        method: 'PUT',
        path: '/update/{id}',
        config: {
            auth: 'simple'
        },
        handler: async (req, h) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.payload.password, salt);
                await userModel.findByIdAndUpdate(req.params.id, {
                    username: req.payload.username,
                    email: req.payload.email,
                    password: password,
                    phonenumber: req.payload.phonenumber
                })
                return h.response('User Profile got updated').code(200)

            } catch (error) {
                return h.response(error).code(500)
            }
        },
        // options: {
        //     validate: {
        //         payload: Joi.object({
        //             username: Joi
        //                 .string()
        //                 .min(2)
        //                 .max(10)
        //                 .required(),
        //             email: Joi
        //                 .string()
        //                 .min(6)
        //                 .email()
        //                 .required(),
        //             password: Joi
        //                 .string()
        //                 .regex(/^[a-zA-Z0-9]{5,10}$/)
        //                 .required(),
        //             phonenumber: Joi
        //                 .string()
        //                 .regex(/^[7-9]\d{9}$/)
        //                 .required()
        //         }),
        //         failAction: (request, h, error) => {
        //             return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover();
        //         }
        //     }
        // }
    })

    await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();