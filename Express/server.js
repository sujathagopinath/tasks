var express = require('express');
var app = express();




app.get('/', (req, res) => {
    res.send("Hello World!!");
})




app.listen(4500, (req, res) => {
    console.log("server is started");

})