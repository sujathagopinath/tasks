const Joi = require('joi');
const schema = Joi.object({
    userEmail: Joi.string()
        .min(5)
        .max(30)
        .email()
        .required(),
    userPassword: Joi
        .string()
        .regex(/^[a-zA-Z0-9]{5,10}$/)
        .required()
});

module.exports = schema

 