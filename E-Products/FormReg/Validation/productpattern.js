const Joi = require("joi");
const schemas = Joi.object({
  productname: Joi.string().min(4).max(30).required(),
  productnote: Joi.string().min(4).max(30).required(),
  price: Joi.number().min(2).max(50).required(),
});

module.exports = schemas;
