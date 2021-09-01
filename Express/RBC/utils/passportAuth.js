const passport = require('passport')
const localpassport = require('passport-local').Strategy
const User = require('../models/user')

passport.use(
    new localpassport({
        usernameField: "email",
        passwordField: "password"
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email })
            if (!user) {
                return done(null, false, { message: "Email is not exist" })
            }
            const isMatch = await user.isPasswordMatch(password)
            // if (isMatch) {
            //     return done(null, user)
            // }
            // else {
            //     return done(null, false, { message: "Invalid credentials" })
            // }
            return isMatch ? done(null, user) : done(null, false, { message: "Invalid credentials" })
        } catch (error) {
            done(error)
        }

    })
)

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});