const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to db");
    })
    .catch((err) => console.log(err));

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, './public')))

const User = require('./models/user');
const Book = require('./models/book');



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/userpage', (req, res) => {
    res.render('userpage')
})

app.get('/signupsignin', (req, res) => {
    res.render('signupsignin');
})

app.post('/signup', async (req, res) => {
    const data = req.body;
    const user = new User(data);
    await user.save();
    // .then((d)=>{
    //     console.log(d);
    // })
    res.redirect(`/userpage/${user._id}`)

})

app.post('/signin', async (req, res) => {

    const { Emailid } = req.body;
    const user = await User.findOne({ Emailid })
        .then((user) => {
            if (user) {
                const id = user._id
                res.redirect(`/userpage/${id}`)
            }
        }).catch((err) => {
            console.log(err);

        })

})

app.get('/userpage/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render('userpage', { user })
})



app.get('/event', (req, res) => {
    res.render('event');
})

// app.get('/book',(req,res)=>{
//     res.render('book');
// })
app.post('/event', (req, res) => {
    res.render('event');
})

app.get('/:id/member', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await User.find({});
    res.render('members', { data, id });

}))

app.get('/books', wrapAsync(async (req, res) => {
    const book = await Book.findOne({});
    res.render('book', { book });
}))



app.listen('3000', (req, res) => {
    console.log('server is running @ 3000');
})