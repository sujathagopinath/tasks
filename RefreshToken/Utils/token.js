"use strict";
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
function createToken(datas) {
  return jwt.sign(
    {
      userId: datas["recordset"][0]["userId"],
      name: datas["recordset"][0]["name"],
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
}

function refreshtokens(datas) {
  return jwt.sign(
    {
      userId: datas["recordset"][0]["userId"],
      name: datas["recordset"][0]["name"],
    },
    process.env.REFRESH_KEY,
    {
      expiresIn: "24h",
    }
  );
}
(module.exports = createToken), refreshtokens;
