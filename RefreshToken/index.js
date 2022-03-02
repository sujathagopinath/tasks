require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Path = require("path");
const poolPromise = require("./DatabaseConnection/index");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 8000,
  });

  server.state("refreshtokened", {
    ttl: 1000 * 60 * 60 * 24,
    isSecure: true,
    isHttpOnly: true,
    encoding: "base64json",
  });

  await server.register([
    {
      plugin: require("./Plugins/userplugin"),
    },
    {
      plugin: require("@hapi/cookie"),
    },
  ]);

  server.auth.strategy("jwt", "cookie", {
    cookie: {
      password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
      isSecure: false,
    },
  });

  poolPromise;
  await server.start();
  console.log("Server started at 8000");
};
init();
