const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongoURI = "mongodb://localhost:27017/session"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("connected to DB");
    })

var store = new MongoDBStore({
    uri: mongoURI,
    collection: 'datas'
});

// Catch errors



app.use(session({
    secret: "some key",
    resave: false,
    saveUninitialized: false,
    store: store,
})
);

app.get('/', (req, res) => {
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    res.send("Hello new session");
})

app.listen(5000, (req, res) => {
    console.log("server is running @ port 5000");
})