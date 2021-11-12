const { User, validate } = require('../models/User')
const express = require('express')
const Userrouter = express.Router();

Userrouter.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        console.log("reqbody", req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { name, email, password } = req.body
        const userCreated = await User.create({ name, email, password })
        userCreated.save();
        if (userCreated) {
            name: userCreated.name
        }
    }
    catch (error) {
        console.log("error", error)
    }

})

module.exports = Userrouter