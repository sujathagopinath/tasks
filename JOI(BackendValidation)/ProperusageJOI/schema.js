const Joi = require('joi');
const schema = Joi.object({
    title: Joi.string().min(5).max(30).required(),
    content: Joi.string().min(24).max(255).required(),
});

module.exports = schema