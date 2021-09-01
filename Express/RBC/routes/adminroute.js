const express = require('express');
const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');

router.get('/users', async (req, res, next) => {
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
        if (!mongoose.Types.ObjectId.isValid(id)) {
            req.flash('error', 'Invalid Id')
            res.redirect('/admin/users')
            return;
        }
        const person = await User.findById(id)
        res.render('profile', { person })
    }
    catch (error) {
        next(error)
    }
})

router.post('/update', async (req, res, next) => {
    const { id, role } = req.body
    if (!id || !role) {
        req.flash('error', "Invalid Credentials")
        res.redirect('/admin/users')
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        req.flash('error', 'Invalid Id')
        res.redirect('/admin/users')
    }
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
        req.flash('error', 'Invalid role');
        return res.redirect('/admin/users')
    }
    if (req.user.id === id) {
        req.flash('error', 'Admin cannot change their role ask another Admin to change');
        return res.redirect('/admin/users')
    }

    const user = await User.findByIdAndUpdate(
        id,
        { role: role },
        { new: true, runValidators: true }
    )
    req.flash('info', `updated role for ${user.email} to ${user.role}`)
    res.redirect('/admin/users')

})


module.exports = router