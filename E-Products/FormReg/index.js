const express = require("express");
const app = express();
const routes = require("./routes/User");
const products = require("./routes/Products");
const admin = require("./routes/Admin");
const bodyParser = require("body-parser");
const bunyan = require("bunyan");
const uuid = require("uuid");

const log = bunyan.createLogger({
  name: "my-app",
  serializers: bunyan.stdSerializers,
});

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("uploads"));

app.use((req, res, next) => {
  console.log("backend", req);
  req.log = log.child({ req_id: uuid.v4() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
});

app.use("/api/users", routes.router);
app.use("/api/products", products.productRoute);
app.use("/api/admin", admin.Adminrouter);

app.listen("5000", (req, res) => {
  console.log("Server started at 5000");
});
