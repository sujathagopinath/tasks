const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');

const authTokenGenerator = userId => {
  return jwt.sign({ id: userId }, 'some key', { expiresIn: '15d', }, (err, token) => {
    res.json({
      token: token,
    })
  });

};

app.post('/books', verifyToken, (req, res) => {
  jwt.verify(req.token, "some key", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    else {
      res.json({
        message: "successfully posted",
        authData: authData
      })
    }
  })

})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();

  }
  else {
    res.sendStatus(403);
  }
}

module.exports = authTokenGenerator;


