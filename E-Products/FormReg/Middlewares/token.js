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
        req.decoded = decoded.userId;
        req.isAdmin = decoded.isAdmin;
        console.log("decoded", decoded.userId); 
        console.log("isAdmin", decoded.isAdmin); 
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

const isAdmin = (req, res, next) => {
  if (req.isAdmin)
    return next();
  console.log('not authorised')
  res.status(403).json({
    message:"Warning You are not authorised"
  })
}

module.exports = { authMiddlware,isAdmin } ;