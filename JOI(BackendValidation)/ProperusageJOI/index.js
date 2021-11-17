const express = require("express");
const app = express();
const middleware = require('./middleware');
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Joi', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Something went wrong!!");
})
db.once('open', () => {
    console.log("Connected to the DB");
})


app.get('/', (req, res) => {
    res.send("hello")
})
app.post('/book', middleware, (req, res) => {
    console.log("value", req.body)
    // res.json( req.body })
    res.status(200)
    res.send(req.body)
})
app.listen(4040, (req, res) => {
    console.log("Server is running on port 4040");
})