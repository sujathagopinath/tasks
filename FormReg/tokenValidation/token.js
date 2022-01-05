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
        req.decoded = decoded.id
        console.log("decoded", decoded.id);
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
