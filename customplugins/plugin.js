const { signup } = require("./routes");

exports.plugin = {
  name: "sampleplugin",
  register: async (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/",
        handler: function (request, h) {
          return "Hello Custom Plugins";
        },
      },

      {
        method: "GET",
        path: "/test",
        handler: function (request, h) {
          return "Hello world";
        },
      },
      {
        method: "GET",
        path: "/username",
        handler: function (request, h) {
          const name = options.name;
          return `Hello ${name}`;
          h.state("name", "tom");
          console.log(request.state.name);
          return h.response(request.state.name);
        },
      },
      {
        method: "POST",
        path: "/create",
        handler: signup,
      },
    ]);
    server.ext("onRequest", function (request, h) {
      request.setUrl("/");
      console.log("inside onRequest");
      request.setUrl("/create");
      request.setMethod("POST");
      return h.continue;
    });
    server.ext("onPreAuth", (request, h) => {
      console.log("onPreAuth");
      h.continue();
    });

    server.ext("onPostAuth", (request, h) => {
      console.log("onPostAuth");
      return h.continue();
    });
    server.ext("onPreHandler", function (request, h) {
      console.log("inside onPreHandler");
      return h.continue;
    });
    server.ext("onPostHandler", function (request, h) {
      console.log("inside onPostHandler");
      return h.continue;
    });
    server.ext("onPreResponse", function (request, h) {
      console.log("inside onPreResponse");
      return "Ok";
    });
  },
};
