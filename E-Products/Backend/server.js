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

  await server.register([
    {
      plugin: require("hapi-pino"),
      options: {
        enableByDefault: true,
      },
    },
    {
      plugin: require("hapi-auth-bearer-token"),
    },
  ]);

  server.auth.strategy("simple", "bearer-access-token", {
    allowMultipleHeaders: true, // optional, false by default
    validate: async (request, token, h) => {
      token = request.headers.authorization.split(" ")[1];
      const isValid = token;
      const credentials = { token };
      jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) {
          return h.response("Not authorised").code(401);
        }
        req.decoded = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        console.log("decoded", decoded.userId);
        console.log("isAdmin", decoded.isAdmin);
        next();
      });
      return { isValid, credentials };
    },
  });

  server.logger.info(() => {
    req: Request;
  });

  poolPromise;
  await server.start();
  console.log("Server started at 4000");
  server.route(Routes);
};
init();
