require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Path = require("path");
const poolPromise = require("./Config/db");
const Routes = require("./Routes");
const db = require("./Config/db");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

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

  server.state("data", {
    ttl: 1 * 3600 * 1000,
    isSecure: true,
    isHttpOnly: true,
  });

  const validate = async (req, { userId }) => {
    console.log(userId);
    const result = await getpool();
    const userdata = await result.query(
      `select * from Users where userId = ${userId}`
    );
    console.log("data", userdata);
    if (!userdata) {
      return { valid: false };
    }

    return { valid: true, credentials: userdata };
  };

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
    {
      plugin: require("@hapi/cookie"),
    },
    {
      plugin: require("@hapi/inert"),
    },
  ]);

  server.auth.strategy("session", "cookie", {
    cookie: {
      password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
      isSecure: false,
    },
    validateFunc: validate,
  });
  server.auth.default("session");

  // server.auth.strategy("simple", "bearer-access-token", {
  //   allowMultipleHeaders: true, // optional, false by default
  //   validate: async (req, decoded, next) => {
  //     token = req.headers.authorization.split(" ")[1];
  //     const isValid = token;
  //     const credentials = { token };
  //     // jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
  //     if (!isValid) {
  //       return h.response("Not authorised").code(401);
  //     }
  //     req.decoded = decoded.userId;
  //     req.isAdmin = decoded.isAdmin;
  //     console.log("decoded", decoded.userId);
  //     console.log("isAdmin", decoded.isAdmin);
  //     // next();
  //     // });
  //     return { isValid, credentials };
  //   },
  // });

  server.logger.info(() => {
    req: Request;
  });

  poolPromise;
  await server.start();
  console.log("Server started at 4000");
  server.route(Routes);
};;
init();
