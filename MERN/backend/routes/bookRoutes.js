const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRouter = express.Router();
const multer = require('multer');
const fs = require('fs');

var multerStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, '../myuploads'));

  },
  filename: function (req, file, callback) {
    callback(null, Date.now('yyyy/mm/dd') + '_' + file.originalname);
    console.log(Date.now('yyyy/mm/dd'));
  }
})

var multersigleUpload = multer({ storage: multerStorage });

//Create Book
bookRouter.post(
  '/',

  asyncHandler(multersigleUpload.single('image'), (req, res) => {
    // const { book, image } = await Book.create(req.body);
    const book = new Book({
      book: req.body.book,
      image: req.file.filename,

    });
    console.log(book, image)

    book.save((book, err) => {
      if (book) {
        res.status(200);
        res.json(book);
      }
      else {
        res.status(500);
        throw new Error("Book Creating Failed");
      }
    })

  })
);

// const book = new Book({
//   book: req.body.book,
//   image: req.file.filename,
// })

bookRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate('createdBy').sort('createdAt');
    //Compare password
    if (books) {
      res.status(201);
      res.send(books);
    } else {
      res.status(401);
      throw new Error('Server error');
    }
  })
);

//Delete book

bookRouter.delete(
  '/:id',

  asyncHandler(async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id, (err, result) => {
        if (result.image != "") {
          try {
            fs.unlinkSync('./myuploads/' + result.image);
          } catch (err) {
            console.log(err);
          }
        }
      });
      res.status(200);
      res.send(book);
    } catch (error) {
      res.status(500);
      throw new Error('Server Error');
    }
  })
);

//Update

bookRouter.put(
  '/:id',
  // authMiddlware,
  multersigleUpload.single('image'),
  asyncHandler(async (req, res) => {
    let newimage = '';

    if (req.file) {
      newimage = req.file.filename;
      try {
        fs.unlinkSync("./myuploads/" + req.body.oldimage);
      } catch (err) {
        console.log(err);
      }
    }
    else {
      newimage = req.body.oldimage;
    }
    const book = await Book.findById(req.params.id);
    if (book) {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200);
      res.json(updatedBook)
      // res.json({
      //   id: updatedBook._id,
      //   name: updatedBook.name,
      //   token: authTokenGenerator(updatedBook._id),
      // })
    }
    else {
      res.status(500)
      throw new Error('Update Failed');
    }
  })
);

//find a book
bookRouter.get(
  '/:id',
  // authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.status(200);
      res.send(book);
    } catch (error) {
      res.status(500);
      throw new Error('No book found');
    }
  })
);

module.exports = { bookRouter };
