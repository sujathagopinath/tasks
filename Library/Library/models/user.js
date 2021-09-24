const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    username: 'String',
    Emailid: 'String',
    Password: 'String',
    ConfirmPassword: 'String',
    message: 'String',
    category: 'String'
})

const user = mongoose.model('user', Userschema);
module.exports = user;