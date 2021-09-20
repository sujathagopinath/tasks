const Joi = require('joi');

const createUserSchema = Joi.object({
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
})


module.exports = createUserSchema;