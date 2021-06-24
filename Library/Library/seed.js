const mongoose = require('mongoose');
 //mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})

 const User = require('./models/user');


const U = new User({
    Username:'vaishu',
    Emailid :'abc@gmail.com',
    Password :1234,
    ConfirmPassword :1234,
    message:'hello',
    category:'science fiction'
        
}) .save();

// const Book = require('./models/book');

// const b = new Book({
//     bookcategory:'aaa',
//     title:'sss',
//     authorname:'ddd',
//     descriptions:'fff',
//     publications:'ggg'
// }).save();

