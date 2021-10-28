var express = require('express');
var ejs = require('ejs');
var expressLayouts = require('express-ejs-layouts')

var app = express();
app.use(expressLayouts);

app.set('view engine', 'ejs');

app.get('/data', (req, res) => {
    res.render('index', {
        // { foo: "Data" },
        people: [
            {
                name: 'sonnakshi'
            },
            {
                name: 'david'
            }

        ]
    })
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(4042, (req, res) => {
    console.log("Server is running @ PORT 4042");
})