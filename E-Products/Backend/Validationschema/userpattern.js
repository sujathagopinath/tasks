const Joi = require("joi");

const schema = Joi.object({
  userName: Joi.string().min(4).max(10).required(),
  userEmail: Joi.string().min(5).max(30).email().required(),
  userPassword: Joi.string()
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9]).{8}$/
    )
    .required(),
});

module.exports = { schema };
