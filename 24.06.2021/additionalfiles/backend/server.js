require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
require('./config/dbConnect')();
const app = express();

//Routes
app.use(express.json());

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);

// app.post('/api/users/register', (req, res) => {
//   res.send('register route')
// })

// //Deployment
// const directory = path.resolve();
// app.use(express.static(path.join(directory, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.resolve(directory, 'frontend', 'build', 'index.html'))
// );
const __dirname2 = path.resolve();
app.use('/uploads', express.static(path.join(__dirname2, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname2, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname2, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
//====Catch Error
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);

//End of deployment

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
