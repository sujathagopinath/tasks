const express = require('express');
const app = express();


const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta');
    res.cookie('fruit', 'orange mango')
    res.cookie('animal', 'tiger$')
    res.send('OK SENT YOU A COOKIE!!!')
})

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true })
    res.send('OK SIGNED YOUR FRUIT COOKIE!')
})

app.get('/verifyfruit', (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)
    res.send(req.signedCookies)
})

function validatecookie(req, res, next) {
    const { cookies } = req;
    // console.log(cookies);
    // next();
    if ('session_id' in cookies) {
        console.log("Session ID exists");
        if (cookies.session_id === '1234') {
            next();
        } else {
            res.status(404).send({ msg: "Invalid" });
        }
    }
    else {
        res.status(404).send({ msg: "Invalid" });
    }
}
app.get('/signin', (req, res) => {
    res.cookie('session_id', '1234');
    res.status(200).json({ msg: 'Logged in' });
})

app.get('/protected', validatecookie, (req, res) => {
    res.status(200).json({ msg: "You are authorized" });
})

app.listen(3000, () => {
    console.log("SERVING!")
})