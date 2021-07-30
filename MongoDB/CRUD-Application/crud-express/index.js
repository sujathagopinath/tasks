import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Routes from './routes/route.js';

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/users', Routes);

mongoose.connect("mongodb://localhost:27017/newcrud", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Something went wrong!!");
})
db.once('open', () => {
    console.log("Connected to the DB");
})

app.listen(8080, (req, res) => {
    console.log("serving the CRUD @ PORT 8080");
})

// const EventEmitter = require('events');
// const data = new EventEmitter()
// data.emit("test")

// data.on 

