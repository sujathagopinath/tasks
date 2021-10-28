var express = require('express');
var app = express();

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
})

app.get('/data', (req, res) => {
    res.send("Middleware");
})

app.listen(4041, (req, res) => {
    console.log("Server is started @ 4041");
})