const express = require('express');
const productRoute = express.Router();
const db = require('../config/db');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const middleware = require('../Validation/middleware')

async function getpool() {
  const pool = await db.poolPromise;
  const result = await pool.request();
  return result;
}

productRoute.post('/create',middleware, async (req, res,next) => {
    console.log("body", req.body)
    console.log("decode", req.decoded)
    const custId = req.decoded
    const { productId, productname, price } = req.body
    
})

module.exports = {productRoute}