const express = require("express");
const app = express();
const middleware = require('./middleware');

app.use(express.json());

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