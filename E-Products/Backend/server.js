require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Path = require("path");
const jwt = require("jsonwebtoken");
const poolPromise = require("./Config/db");

const Routes = require("./Routes");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 4000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, "uploads"),
      },
    },
  });

  poolPromise;
  await server.start();
  console.log("Server started at 4000");
  server.route(Routes);
};
init();
