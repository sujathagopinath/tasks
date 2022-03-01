require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Path = require("path");
const poolPromise = require("./DatabaseConnection/index");
const Routes = require("./Routes");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 8000,
  });
  await server.register([
    {
      plugin: require("./Plugins/userplugin"),
    },
  ]);

  poolPromise;
  await server.start();
  console.log("Server started at 8000");
  server.route(Routes);
};
init();
