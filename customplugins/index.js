const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 8000,
  });

    server.state("name", {
      ttl: null,
      isSecure: true,
      isHttpOnly: true,
    });

  await server.register([
    {
      plugin: require("./plugin"),
      options: {
        name: "testname",
      },
    },
    {
      plugin: require("@hapi/cookie"),
    },
  ]);

    server.auth.strategy("session", "cookie", {
      cookie: {
        password: "!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6",
        isSecure: false,
      },
    });
    server.auth.default("session");

  await server.start();
  console.log("Server started at 8000");
};;
init();
