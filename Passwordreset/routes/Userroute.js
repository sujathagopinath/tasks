const express = require('express');
const Userouter = express.Router();
const { User, validateUser } = require('../models/User')

// Userouter.post('/', (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     });
//     // user.save()
//     user.save((err) => {
//         if (err) {
//             res.json({ message: err.message, type: 'danger' })
//         } else {
//             res.json({
//                 type: 'success',
//                 message: 'User Added Successfully'
//             });
//         }
//     });
// })

Userouter.post('/add', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        const user = await new User(req.body).save();
        res.send(user)
    }
    catch (error) {
        res.send("An error occured")
        console.log(error)
    }
})

module.exports = Userouter