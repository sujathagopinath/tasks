var express = require('express');
var app = express();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use(express.urlencoded({ extended: false }));

const users = [
    {
        name: 'Mark',
        age: 21
    },
    {
        name: 'Nilan',
        age: 24
    }
]
const posts = [
    {
        title: 'Maxmiller'
    },
    {
        title: 'Two states'
    }
]

app.use('/users', userRoute);
app.use('/auth', authRoute);

// app.get('/users', (req, res) => {
//     res.status(200).send(users);
// })
// // app.get('/users/:name', (req, res) => {
// //     console.log(req.params)
// // })

// app.get('/users/:name', (req, res) => {
//     const { name } = req.params;
//     const user = users.find((user) => user.name === name);
//     if (user) {
//         res.status(200).send(user)
//     }
//     else {
//         res.status(404).send("Not found");
//     }

// })

// app.get('/posts', (req, res) => {
//     const { title } = req.query;
//     console.log(req.query);
//     if (title) {
//         const post = posts.find((post) => post.title === title);
//         if (post) {
//             res.status(200).send(post)
//         }
//         else {
//             res.status(404).send("Not found");
//         }
//     }

// })

// app.post('/post', (req, res) => {
//     console.log(req.body);
//     const user = req.body;
//     users.push(user);
//     res.status(201).send("New user created");
// })

// function validateToken(req, res, next) {
//     console.log("Inside the Validate Token");
//     const { authorization } = req.headers;
//     if (authorization && authorization == "1234") {
//         next();

//     } else {
//         res.status(404).send("Invalid crendentials");
//     }
// }

// app.post('/posts', validateToken, (req, res) => {
//     console.log(req.headers);
//     // const { authorization } = req.headers;
//     // if (authorization && authorization == "1234") {
//     const post = req.body;
//     console.log(post);
//     posts.push(post);
//     res.status(201).send(post);
//     // }
//     // else {
//     //     res.status(404).send("Not found");
//     // }

// })


app.listen(4040, (req, res) => {
    console.log("Server is started @ 4040");
})

