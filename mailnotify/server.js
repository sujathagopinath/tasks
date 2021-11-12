require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./config/dbConnect')
dbConnect();
const Userrouter = require('./routes/userroute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', Userrouter)

app.get('/', (req, res) => {
    res.send("Mail Notify");
})

app.listen('4000', (req, res) => {
    console.log('listening @ 4000')
})