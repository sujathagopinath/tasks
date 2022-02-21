const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 8000,
  });

  await server.register([
    {
      plugin: require("./plugin"),
      options: {
        name: "testname",
      },
    },
  ]);

  await server.start();
  console.log("Server started at 8000");
};
init();
