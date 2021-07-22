var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');

app.get('/data', (req, res) => {
    res.render('index');
})

app.listen(4042, (req, res) => {
    console.log("Server is running @ PORT 4042");
})