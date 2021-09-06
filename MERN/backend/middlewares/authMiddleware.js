const asynchHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// /We have to get the token from the header and decode that token to get the user id

const authMiddlware = asynchHandler(async (req, res, next) => {
  let token;
  // console.log(req.headers.authorization.startsWith('Bearer')); //This will return true
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //Grab only the token
      // console.log(req.headers.authorization.split(' ')[1]);
      token = req.headers.authorization.split(' ')[1];
      console.log("token", token)
      if (!token) {
        res.status(401)
        return res.send('Not authorised, no token')
      }
      //Decode the user
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          res.status(401)
          return res.send("Not authorised, invalid token")
        }
        // console.log("newtoken", token)
        req.decoded = decoded.id
        console.log("decoded", decoded.id);
        next();
      });
    } catch (error) {
      // console.log("error", error)
      res.status(500)
      res.send("server error")
    }
  }


});

module.exports = authMiddlware;
