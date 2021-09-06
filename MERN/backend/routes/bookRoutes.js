const express = require('express');
const asyncHandler = require('express-async-handler');
const authMiddlware = require('../middlewares/authMiddleware');
const Book = require('../models/Book');
const bookRouter = express.Router();

//Create Book
bookRouter.post(
  '/',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      console.log("body", req.body)
      console.log("decode", req.decoded)
      const createdbyId = req.decoded

      const { category, title, author, createdby } = req.body
      if (category == undefined || title == undefined || author == undefined || createdby == undefined) {
        // console.log("category", category);
        res.status(400)
        res.send("All fields are required")
        return
      }
      await Book.create({ category, title, author, createdby, createdbyId })
        .then(book => {
          if (book) {
            res.status(201)
            res.json({ book })
          }
        })
    } catch (error) {
      res.status(500).send('Server Error')
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
            res.status(200)
            res.send(books)
          }
        })
    }
    catch (error) {
      res.status(500)
      res.send('Server Error')
    }
  })
);

//Delete book

bookRouter.delete(
  '/:id',
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id)
        .then(book => {
          if (book) {
            res.status(200)
            res.json({ book })
            console.log(book)
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
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      // console.log("req", req.body)
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
            res.status(400)
            res.send('Book has not updated')
          }
          else {
            res.status(200);
            res.send('Book has updated successfully')
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
  authMiddlware,
  asyncHandler(async (req, res) => {
    try {
      await Book.findById(req.params.id)
        .then(book => {
          if (book) {
            res.status(200)
            res.send(book)
          }
          else {
            res.status(404);
            res.send('No book found')
          }
        })

    } catch (error) {
      res.status(500)
      res.send('Server Error')
    }
  })
);

module.exports = { bookRouter };
