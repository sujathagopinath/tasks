const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userModel = mongoose.model("employees", {
    username: String,
    password: String,
    email: String,
    phonenumber: String
});

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(request.payload.password, salt);

module.exports = userModel