require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Userrouter = require('./routes/Userroute')
const Passrouter = require('./routes/Resetpassword')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', Userrouter)
app.use('/api', Passrouter)

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Something went wrong!!");
})
db.once('open', () => {
    console.log("Connected to the DB");
})


app.listen('3000', (req, res) => {
    console.log("server at 3000")
})