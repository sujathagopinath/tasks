const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

const User = mongoose.model('User', UserModel);
module.exports = User;