const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/user', async (req, res, next) => {
    try {
        const users = await User.find()
        res.render('manage', { users })
        // res.send(users)
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params
    }
    catch (error) {
        next(error)
    }
})

module.exports = router