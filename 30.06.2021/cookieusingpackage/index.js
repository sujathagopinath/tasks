const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser('secret'));


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

app.listen(3000, () => {
    console.log("SERVING!")
})