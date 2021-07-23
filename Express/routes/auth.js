const { Router } = require('express');
const passport = require('passport');

const router = Router();

// app.post('/login',
//     passport.authenticate('local', { failureRedirect: '/login' }),
//     function (req, res) {
//         res.redirect('/');
//     });

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send(200);
})

module.exports = router