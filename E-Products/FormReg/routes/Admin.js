const express = require("express");
const Adminrouter = express.Router();
const db = require("../config/db");
const { authMiddlware, isAdmin } = require("../Middlewares/token");

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

Adminrouter.get("/allusers", authMiddlware, isAdmin, async (req, res) => {
  const result = await getpool();
  result
    .query("select * from Users")
    .then(function (data) {
      console.log("data", data);
      if (data) {
        res.status(200);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

Adminrouter.get("/allproducts", authMiddlware, isAdmin, async (req, res) => {
  const result = await getpool();
  result
    .query("select * from Products")
    .then(function (data) {
      console.log("data", data);
      if (data) {
        res.status(200);
        res.send(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = { Adminrouter };
