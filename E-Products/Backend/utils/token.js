"use strict";
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
function createToken(datas) {
  return jwt.sign(
    {
      userId: datas["recordset"][0]["userId"],
      isAdmin: datas["recordset"][0]["isAdmin"],
      email: datas["recordset"][0]["userEmail"],
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
}

module.exports = createToken;
