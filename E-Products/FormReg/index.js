const express = require('express');
const app = express();
const routes = require('./routes/User')
const products = require('./routes/Products')
const bunyan = require("bunyan");
const uuid = require("uuid");

const log = bunyan.createLogger({
  name: "my-app",
  serializers: bunyan.stdSerializers,
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  req.log = log.child({ req_id: uuid.v4() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
});

app.use('/api/users', routes.router)
app.use('/api/products', products.productRoute)



app.listen('5000', (req, res) => {
    console.log('Server started at 5000')
})