const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const User = require("./models/Users");
const bcrypt = require("bcryptjs");

const mongoURI = "mongodb://localhost:27017/session"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => {
        console.log("connected to DB");
    })

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

var store = new MongoDBStore({
    uri: mongoURI,
    collection: 'datas'
});

app.use(session({
    secret: "some key",
    resave: false,
    saveUninitialized: false,
    store: store,
})
);

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else {
        res.redirect('/login');
    }


}

// app.get('/', (req, res) => {
//     req.session.isAuth = true;
//     console.log(req.session);
//     console.log(req.session.id);
//     res.send("Hello new session");
// })

app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/dashboard", isAuth, (req, res) => {
    const username = req.session.username;
    res.render("dashboard", { name: username });
})

app.get("/login", (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", { err: error });
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid Credentials";
        return res.redirect("/login");
    }
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);
    req.session.username = user.username;
    res.redirect("/dashboard");

})


app.get("/register", (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", { err: error });
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
        req.session.error = "User already exists";
        return res.redirect("/register");
    }
    const hasdPsw = await bcrypt.hash(password, 12);
    user = new User({
        username,
        email,
        password: hasdPsw,
    });
    await user.save();
    res.redirect("/login");
})

app.post('/logout', (req, res) => {
    req.session.destroy()
    //     ((err) => {
    //     // res.redirect("/login");
    // });
});


app.listen(9000, (req, res) => {
    console.log("server is running @ port 9000");
})