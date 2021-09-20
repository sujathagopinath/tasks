const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userModel = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phonenumber: String
})

userModel.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const salt = await bcrypt.genSalt(10)
            const hashpassword = await bcrypt.hash(this.password, salt)
            this.password = hashpassword;
        }
        next()
    } catch (error) {
        next(error)
    }
})

userModel.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password); //returns promise async function
};

const Employees = mongoose.model('employees', userModel);

module.exports = Employees;


// module.exports = userModel