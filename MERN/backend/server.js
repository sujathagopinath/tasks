const dotenv = require('dotenv')
const path = require('path');
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
const dbConnect = require('./config/dbConnect');
const fileUpload = require('express-fileupload')

const app = express();
dbConnect();
dotenv.config();
//Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(express.static('myuploads'));

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);


app.get('/', (req, res) => {
  res.send('API is running....');
});
// }
//====Catch Error
app.use(error.notfoundErrorMiddleware);
app.use(error.errorMiddlewareHandler);


app.listen(5000, () => {
  console.log("Server is running on port 5000");
})