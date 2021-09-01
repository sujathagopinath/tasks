const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { roles } = require('../utils/constants')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [roles.admin, roles.intermeditate, roles.client],
        default: roles.client

    }
})

UserSchema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashpassword = await bcrypt.hash(this.password, salt)
            this.password = hashpassword;
            if (this.email === 'admin@gmail.com') {
                this.role = roles.admin

            }
        }
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password); //returns promise async function
};

const User = mongoose.model('user', UserSchema)
module.exports = User