const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const app = express();
const User = require('./model/User')
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
})
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  key: "userId",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
},
})
);

const dbConnect = async () => {
    try {
      mongoose.connect(
        "mongodb://localhost:27017/RolesAuth",
        {
          useFindAndModify: false,   
          useUnifiedTopology: true,   
          useCreateIndex: true,       
          useNewUrlParser: true,
        },
        () => {
          console.log('DB connected');
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

 dbConnect()

app.get("/register", async (req, res) => {
  
    const { username, password } = req.body;
    const userCreated = await new User(req.body).save();
    res.send(userCreated);
});

app.get("/login", (req, res) => {

if (req.session.user) {

res.send({ loggedIn: true, user: req.session.user });

} else {

res.send({ loggedIn: false });

}

});

app.post("/login", (req, res) => {

const username = req.body.username;

const password = req.body.password;

db.query(

"SELECT * FROM users WHERE username = ?;",

username,

(err, result) => {

if (err) {

res.send({ err: err });

}

if (result.length > 0) {

bcrypt.compare(password, result[0].password, (error, response) => {

if (response) {

req.session.user = result;

console.log(req.session.user);

res.send(result);

} else {

res.send({ message: "Wrong username/password combination!" });

}

});

} else {

res.send({ message: "User doesn't exist" });

}

}

);

});

app.listen(3001, () => {

console.log("running server");
})