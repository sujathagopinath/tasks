const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRouter = express.Router();


//Create Book
bookRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    const { book } = await Book.create(req.body);

    if (book) {
      res.status(200);
      res.json(book);
    }
    else {
      res.status(500);
      throw new Error("Book Creating Failed");
    }


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
      const book = await Book.findByIdAndDelete(req.params.id)

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

  asyncHandler(async (req, res) => {

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
