const { signup } = require("./User/signup");
const { signin } = require("./User/signin");
const { getuserdata } = require("./User/users");

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
    path: "/verify",
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
  {
    method: "GET",
    path: "/getuserdata",
    handler: getuserdata,
    config: {
      auth: "simple",
    },
  },
];
