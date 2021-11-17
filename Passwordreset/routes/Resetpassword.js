require('dotenv').config();
const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { User } = require('../models/User')
const Token = require('../models/token')
const SendEmail = require('../utils/mailnode')
const crypto = require('crypto')

router.post('/password', async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required()
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).send("User does not exists")
        }

        let token = await Token.findOne({ UserId: user._id })
        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex'),
            }).save();
        }

        const link = `${process.env.URL}/password-reset/${user._id}/${token.token}`
        await SendEmail(user.email, 'Password reset', link);
        res.send("Password reset link to your account")
    } catch (error) {
        res.send('An error occurred')
        console.log(error)
    }
})

module.exports = router