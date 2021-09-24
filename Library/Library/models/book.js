const mongoose = require('mongoose');

const Bookschema = new mongoose.Schema({
    bookcategory: 'String',
    title: 'String',
    authorname: 'String',
    descriptions: 'String',
    publications: 'String'
})

const book = mongoose.model('book', Bookschema);
module.exports = book;