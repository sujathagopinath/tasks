const { signup } = require("./User/signup");

module.exports = [
  {
    method: "POST",
    path: "/signup",
    handler: signup,
    options: {
      auth: false,
    },
  },
];
