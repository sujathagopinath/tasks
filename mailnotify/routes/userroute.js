const { User, validate } = require('../models/users')
const express = require('express')
const Userrouter = express.Router();

Userrouter.post('/', async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // console.log("reqbody", req.body);
        // if (error) {
        //     return res.status(400).send(error.details[0].message);
        // }
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        // user.save();
        user.save((err) => {
            if (err) {
                res.json({ message: err.message, type: 'danger' })
            } else {
                res.json({
                    type: 'success',
                    message: 'User Added Successfully'
                });
            }
        });
    }
    catch (error) {
        console.log("error", error)
    }

})

module.exports = Userrouter