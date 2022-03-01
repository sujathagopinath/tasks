const { signup, signin } = require("./Users/user");

module.exports = [
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
];
