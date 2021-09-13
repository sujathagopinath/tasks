const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdby: {
      type: String,
      required: true,
    },
    createdbyId: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
