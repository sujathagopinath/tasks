const { signup, signin } = require("../Routes/Users/user");

exports.plugin = {
  name: "userPlugin",
  register: async (server, options, next) => {
    server.route([
      {
        method: "POST",
        path: "/signup",
        handler: signup,
        options: {
          auth: false,
        },
      },
      {
        method: "POST",
        path: "/signin",
        handler: signin,
        options: {
          auth: false,
        },
      },
    ]);
    // server.ext("onRequest", function (request, h) {
    //   request.setUrl("/signup");
    //   return h.continue;
    // });
    // server.ext("onPreHandler", function (request, h) {
    //   console.log("inside onPreHandler");
    //   return h.continue;
    // });
    // server.ext("onPostHandler", function (request, h) {
    //   console.log("inside onPostHandler");
    //   return h.continue;
    // });
  },
};
