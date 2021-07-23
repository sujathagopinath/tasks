const express = require('express');
const app = express();

app.get('/', (req, res) => {
    var err = new Error("something went wrong");
    next(err);

})


app.use((err, req, res, next) => {
    res.status(500).send("Oops!!");

})


app.listen(4043, (req, res) => {
    console.log("Server is running at 4043");
})