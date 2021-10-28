const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose');
const multer = require('multer');
const Image = require('./models/images')
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('myuploads'));

app.get('/', (req, res) => {
    res.send("hey")
})

mongoose.connect("mongodb://localhost:27017/images", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', () => {
    console.log("Something went wrong!!");
})
db.once('open', () => {
    console.log("Connected to the DB");
})

const storage = multer.diskStorage({
    destination: path.join(__dirname, './uploads'),
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

app.post('/imageupload', async (req, res) => {
    try {
        let upload = multer({ storage: storage }).single('avatar');
        upload(req, res, (err) => {
            // if (!req.file) {
            //     return res.send('Please select an image to upload');
            // }
            // else if (err) {
            //     return res.send(err);
            // }

            const user = new Image({
                imageName: req.file.filename,
            });
            // user.save();
            user.save((err) => {
                if (err) {
                    res.json({ message: "error" })
                } else {
                    res.json({ message: 'success' })
                }
            });

        })
    } catch (err) { console.log(err) }
})

app.listen(8000, (req, res) => {
    console.log("server is at 8000")
})