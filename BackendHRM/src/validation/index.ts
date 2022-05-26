const Joi = require("joi");
export const schema = Joi.object({
    custName: Joi.string().min(4).max(10).required(),
    custEmail: Joi.string().min(5).max(30).email().required(),
    custPassword: Joi.string()
        .regex(
            /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/
        )
        .required(),
    collections: Joi.string().min(5).max(10).required(),
});

module.exports = { schema };
