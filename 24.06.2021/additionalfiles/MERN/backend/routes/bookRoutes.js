const express = require('express');
const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const bookRouter = express.Router();

//Create Book
bookRouter.post(
  '/',
  asyncHandler(async (req, res) => {
    try {
      await Book.create(req.body)
        .then(book => {
          // console.log(book)
          if (book) {
            res.status(201);
            res.json({ book });
          }
        })
    } catch (error) {
      res.status(500).send('Server Error');
    }
  })
)

bookRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    try {
      await Book.find({}).populate('createdBy').sort('createdAt')
        .then(books => {
          if (books) {
            res.status(200);
            res.send(books);
          }
        })
    }
    catch (error) {
      res.status(500);
      res.send('Server Error');
    }
  })
);

//Delete book

bookRouter.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id)
        .then(book => {
          if (book) {
            res.status(200);
            res.json({ book });
            console.log(book);
          }
          else {
            res.status(404)
            res.send('No Book is found in that ID')
          }
        })
    } catch (error) {
      res.status(500);
      res.send("Server Error")
    }
  })
);

//Update

bookRouter.put(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      await Book.findByIdAndUpdate(req.params.id,
        {
          category: req.body.category,
          author: req.body.author,
          title: req.body.title,
          createdby: req.body.createdby,
        },
        (error, data) => {
          console.log(data);
          if (data == null) {
            res.status(400);
            res.send('Book has not updated');
          }
          else {
            res.status(200);
            res.send('Book has updated successfully');
          }
        })
    }
    catch (error) {
      res.status(500)
      res.send('Server Error')
    }
  })
);

//find a book
bookRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    try {
      await Book.findById(req.params.id)
        .then(book => {
          if (book) {
            res.status(200);
            res.send(book);
          }
          else {
            res.status(404);
            res.send('No book found')
          }
        })

    } catch (error) {
      res.status(500);
      res.send('Server Error')
    }
  })
);

module.exports = { bookRouter };
