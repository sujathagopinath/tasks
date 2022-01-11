const jwt = require('jsonwebtoken');

const authMiddlware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log("token", token)
      jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) {
          res.status(401)
          return res.send("Not authorised, invalid token")
        }
        req.decoded = decoded.userId
        console.log("decoded", decoded.userId);
        next();
      });
    } catch (error) {
      res.status(500)
      res.send("server error")
    }
  }

  if (!token) {
    res.status(401)
    return res.send('Not authorised, no token')
  }

};

module.exports = authMiddlware;
