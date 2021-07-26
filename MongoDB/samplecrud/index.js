require("dotenv").config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Something went wrong!!");
})
db.once('open', () => {
    console.log("Connected to the DB");
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "some secret",
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message;  //set session
    delete req.session.message; //delete session
    next();
})

app.set('view engine', 'ejs');

app.use('/', require("./routes/routes"));

app.use(express.static('myuploads'));

app.listen(8080, (req, res) => {
    console.log("serving the CRUD @ PORT 8080");
})