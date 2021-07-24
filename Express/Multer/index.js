const path = require('path');
const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const app = express();

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


var multerStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, 'myuploads'));

    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
        console.log(Date.now());
    }
})

var multersigleUpload = multer({ storage: multerStorage });

app.post("/singleFile", multersigleUpload.single('singleImage'), (req, res) => {
    const file = req.file
    if (!file) {
        return res.end("Please choose a file to upload!");
    }
    req.app.locals.uploadStatus = true;
    res.redirect('/');
})

var multermultiupload = multer({ storage: multerStorage }).array("multipleImage", 3);

app.post("/multipleFile", (req, res) => {
    multermultiupload(req, res, function (err) {
        if (err) {
            return res.end("File did not upload correctly");
        }
        req.app.locals.uploadStatus = true;
        res.redirect('/');
    })

})

app.get('/', (req, res) => {
    const uploadStatus = req.app.locals.uploadStatus;
    req.app.locals.uploadStatus = null;
    res.render('file_upload', {
        title: 'File uploaded uisng Multer in express',
        uploadStatus: uploadStatus
    });
})

app.listen(4000, (req, res) => {
    console.log("Serving at  4000");
})