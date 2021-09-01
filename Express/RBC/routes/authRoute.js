const express = require('express')
const router = express.Router();
const User = require('../models/user')
const { body, validationResult } = require('express-validator')
const passport = require('passport')

router.get('/register', UserNotAuthenticated, async (req, res, next) => {
    res.render('register')
})

router.post('/register', UserNotAuthenticated,
    [
        body('email').trim().isEmail().withMessage('Email must be valid').normalizeEmail().toLowerCase(),
        body('password').trim().isLength(5).withMessage('password is too short'),
        body('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password do not match')
            }
            return true
        })

    ], async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(error => {
                    req.flash('error', error.msg);
                })
                res.render('register', {
                    email: req.body.email,
                    messages: req.flash()
                })
                return
            }
            const { email } = req.body;
            const userExist = await User.findOne({ email: email })
            if (userExist) {
                res.status(400);
                res.send('UserExist')
            }
            const user = new User(req.body)
            await user.save();
            req.flash('success', `${user.email}registered successfully`)
            res.redirect('/auth/login')
            // res.send(user)
        } catch (error) {
            next(error)
        }

    })

router.get('/login', UserNotAuthenticated, async (req, res, next) => {
    res.render('login')
})

router.post('/login', UserNotAuthenticated, passport.authenticate('local', {
    successRedirect: "/user/profile",
    failureRedirect: "/auth/login",
    failureFlash: true
}), async (req, res, next) => {
    res.render('login')
})

router.get('/logout', UserAuthenticated, async (req, res) => {
    req.logout();  //paspport package
    res.redirect('/')
})

function UserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login')
    }
}

function UserNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        next();
    }
}
module.exports = router