const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')
let refreshToken = []
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function auth(req, res, next) {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        console.log("token", token)

        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                console.log("users", req.user);
                next();
            }
            else {
                return res.status(403).json({ message: "unauthorised" })
            }
        })
    }
}

app.post('/renewtoken', (req, res) => {
    const refreshtoken = req.body.token;
    if (!refreshtoken || !refreshToken.includes(refreshtoken))
        console.log("refresh", refreshtoken)
    if (!refreshtoken) {
        return res.status(403).json({ message: "user not authenticated" })

    }
    jwt.verify(refreshtoken, "refresh", (err, user) => {
        if (!err) {
            const accesstoken = jwt.sign({ email: user.email }, "access", { expiresIn: '1h' })
            return res.status(201).json({ accesstoken })
        }
        else {
            return res.status(403).json({ message: "user not authenticated" })
        }
    })
})

app.post('/protected', auth, (req, res) => {
    res.send("Inside protected")
})

app.post('/login', (req, res) => {
    const user = req.body.user;
    console.log("reqbody", user)
    if (!user) {
        return res.status(404).json({ message: "Body is empty" })
    }
    let accesstoken = jwt.sign(user, "access", { expiresIn: '1h' })
    let refreshtoken = jwt.sign(user, 'refresh', { expiresIn: '1d' })
    refreshToken.push(refreshtoken)
    return res.status(201).json({
        accesstoken,
        refreshtoken
    })
})

app.listen('3000', (req, res) => {
    console.log("server is running @ 3000");
})