const express = require('express');
const router = express.Router();
const User = require('../models/users');
const path = require('path')
const multer = require('multer');
const fs = require('fs');

var multerStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../myuploads'));

    },
    filename: function (req, file, callback) {
        callback(null, Date.now('yyyy/mm/dd') + '_' + file.originalname);
        console.log(Date.now('yyyy/mm/dd'));
    }
})

var multersigleUpload = multer({ storage: multerStorage });

router.post("/add", multersigleUpload.single('image'), (req, res) => {
    // Insert an user into a database
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });
    // user.save();
    user.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        } else {
            req.session.message = {
                type: 'success',
                message: 'User Added Successfully'
            };
            res.redirect('/')
        }
    });
})

router.get('/', (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('index', { title: 'HomePage', users: users });

        }
    })

})

router.get('/add', (req, res) => {
    res.render('addusers', { title: 'Add users' });
})

router.get("/edit/:id", (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
        if (err) {
            res.redirect('/');
        } else {
            if (user == null) {
                res.redirect('/')
            }
            else {
                res.render('editusers', { title: 'Edit Users', user: user })


            }

        }

    })
})

router.post("/update/:id", multersigleUpload.single('image'), (req, res) => {
    let id = req.params.id;
    let newimage = '';

    if (req.file) {
        newimage = req.file.filename;
        try {
            fs.unlinkSync("./myuploads/" + req.body.oldimage);
        } catch (err) {
            console.log(err);
        }
    }
    else {
        newimage = req.body.oldimage;
    }
    User.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: newimage,
    }, (err, result) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'User is Updated Successfully'
            }
            res.redirect('/');
        }
    })

})

router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove(id, (err, result) => {
        if (result.image != "") {
            try {
                fs.unlinkSync('./myuploads/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        if (err) {
            res.json({ message: err.message, type: 'danger' })
        }
        else {
            req.session.message = {
                type: 'success',
                message: 'User is Deleted Successfully'
            }
            res.redirect('/');
        }
    })
})

module.exports = router;