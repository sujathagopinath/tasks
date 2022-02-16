const express = require("express");
const app = express();
const routes = require("./Routes/User");
const products = require("./Routes/Products");
const admin = require("./Routes/Admin");
const bunyan = require("bunyan");
const uuid = require("uuid");
const error = require("./Middlewares/error");

const log = bunyan.createLogger({
  name: "my-app",
  serializers: bunyan.stdSerializers,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("uploads"));

app.use((req, res, next) => {
  req.log = log.child({ req_id: uuid.v4() }, true);
  req.log.info({ req });
  res.on("finish", () => req.log.info({ res }));
  next();
});

app.use("/api/users", routes.router);
app.use("/api/products", products.productRoute);
app.use("/api/admin", admin.Adminrouter);

app.use(error.errorMiddlewareHandler);

app.listen("5000", (req, res) => {
  console.log("Server started at 5000");
});
