const mongoose = require('mongoose');
const Joi = require('joi')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('user', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().required(),
        password: Joi.string().min(7).max(20).required()
    })
    return schema.validate(user)
}

module.exports = { User, validateUser };