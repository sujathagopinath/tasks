const { signup, verify, resend } = require("./User/signup");
const { signin, verifymail } = require("./User/signin");
const { getuserdata, allusers, updateuser, promote } = require("./User/users");
const { cart, removeitem } = require("./Products/cart");
const { order, allorders } = require("./Products/order");
const {
  createproduct,
  getproduct,
  allproducts,
  updateproduct,
  deleteproduct,
} = require("./Products/product");

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
    path: "/verify/:emailToken",
    handler: verify,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/resendlink",
    handler: resend,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/signin",
    handler: signin,
    config: {
      pre: [{ method: verifymail }],
    },
  },
  {
    method: "GET",
    path: "/getuserdata",
    handler: getuserdata,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/allusers",
    handler: allusers,
    options: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/update",
    handler: updateuser,
    options: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/promote",
    handler: promote,
    options: {
      auth: false,
    },
  },
  /*End of User Routes */

  {
    method: "POST",
    path: "/create",
    handler: createproduct,
    options: {
      payload: {
        parse: true,
        output: "stream",
        multipart: true,
      },
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getproduct",
    handler: getproduct,
    options: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/allproducts",
    handler: allproducts,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/updateproduct",
    handler: updateproduct,
    options: {
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/delete",
    handler: deleteproduct,
    options: {
      auth: false,
    },
  },

  /*End of Product Routes */

  {
    method: "POST",
    path: "/cart",
    handler: cart,
    options: {
      auth: false,
    },
  },

  {
    method: "DELETE",
    path: "/deletecart",
    handler: removeitem,
    options: {
      auth: false,
    },
  },

  /*End of Cart Routes */

  {
    method: "POST",
    path: "/order",
    handler: order,
    options: {
      auth: false,
    },
  },

  {
    method: "GET",
    path: "/orders",
    handler: allorders,
    options: {
      auth: false,
    },
  },

  /*End of Order Routes */
];
