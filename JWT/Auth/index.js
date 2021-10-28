const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

const users = [
    { "email": "abc@123.com", "id": 1234, "password": "asdf" },
    { "email": "zxc@1234.com", "id": 5678, "password": "qwer" }
]

app.get('/', (req, res) => {
    res.json({
        message: "Hello there",
        data: "yes!!"
    })
})

app.post('/login', (req, res) => {
    console.log("req data", req.body.email, req.body.password);
    users.filter(user => {
        if (user.email === req.body.email) {
            if (user.password === req.body.password) {
                console.log(user);
                const payload = {
                    "id": user.id
                }
                // jwt.sign(payload,secretkey,expriretime)
                jwt.sign(payload, "some key", { expiresIn: "1h" }, (err, token) => {
                    res.json({
                        token: token,
                    })
                })
            }

        }

    })

})

app.post('/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, "some key", (err, authData) => {
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                message: "successfully posted",
                authData: authData
            })
        }
    })
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    }
    else {
        res.sendStatus(403);
    }
}


app.listen(8008, (req, res) => {
    console.log("Serving at 8008!!");
})