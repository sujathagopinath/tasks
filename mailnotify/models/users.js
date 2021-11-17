const mongoose = require('mongoose')
const Joi = require('joi')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

});

const User = mongoose.model('User', UserSchema)

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(7).max(20).required()

    })
    return schema.validate(user)
}

module.exports = { User, validate };