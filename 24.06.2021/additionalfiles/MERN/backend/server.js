const dotenv = require('dotenv')
const express = require('express');
const routes = require('./routes/userRoutes');
const error = require('./middlewares/errorMiddleware');
const bookRouter = require('./routes/bookRoutes');
// const adminRouter = require('./routes/adminRoutes')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const dbConnect = require('./config/dbConnect');
const app = express();
dbConnect();
dotenv.config();
//Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/LibraryManagementDB",
  collection: 'datas'
});

app.use(session({
  secret: "some key",
  saveUninitialized: true,
  resave: false,
  store: store,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60,
  },
})
);

app.use((req, res, next) => {
  console.log("session", req.session);
  next();
})

app.use('/api/users', routes.userRouter);
app.use('/api/books', bookRouter.bookRouter);
// app.use('/api/admin', adminRouter.adminRouter)

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(error.errorMiddlewareHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
})