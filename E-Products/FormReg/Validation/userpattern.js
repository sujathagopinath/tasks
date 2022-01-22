const Joi = require('joi');
const schema = Joi.object({
    userName: Joi
        .string()
        .min(4)
        .max(20)
        .required(),
    userEmail: Joi
        .string()
        .min(5)
        .max(30)
        .email()
        .required(),
    userPassword: Joi
        .string()
        .regex(/^[a-zA-Z0-9]{5,20}$/)
        .required(),
    isAdmin: Joi
        .number()
        .required(),
});

module.exports = schema

 