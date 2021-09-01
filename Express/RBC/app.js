const express = require('express');
const app = express();
const ejs = require('ejs')
const httpErrors = require('http-errors');
const morgan = require('morgan')
const mongoose = require('mongoose');
const session = require('express-session')
const connectFlash = require('connect-flash')
const passport = require('passport');
const { roles } = require('./utils/constants');
require('dotenv').config()

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: "some key",
    saveUninitialized: true,
    resave: false,
    // store: store,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
    },
})
);
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passportAuth')
app.use((req, res, next) => {
    res.locals.user = req.user
    next();
})

app.use(connectFlash());
app.use((req, res, next) => {
    res.locals.messages = req.flash()
    next();
})

app.use('/', require('./routes/indexRoute'))
app.use('/auth', require('./routes/authRoute'))
app.use('/user', UserAuthenticated, require('./routes/userRoute'))
app.use('/admin', UserAuthenticated, IsAdmin, require('./routes/adminroute'))

app.use((req, res, next) => {
    next(httpErrors.NotFound());
})

// app.use((error, req, res, next) => {
//     error.status = error.status || 500
//     res.status(error.status);
//     res.render('error_40x', { error })
//     // res.send("something went wrong")
// })

mongoose.connect("mongodb://localhost:27017/RoleBasedAuth",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("connected to DB");
    }).catch(err => {
        console.log(err)
    })

function UserAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/auth/login')
    }
}

function IsAdmin(req, res, next) {
    if (req.user.role === roles.admin) {
        next();
    } else {
        req.flash('warning', 'you are not authorised to access')
        res.redirect('/')
    }
}

app.listen(8080, (req, res) => {
    console.log("server is started at 8080")
})