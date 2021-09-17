const mongoose = require('mongoose')
const userModel = mongoose.model("employees", {
    firstname: String,
    lastname: String,
    password: String,
    phonenumber: String
});

module.exports = userModel