const signup = async (req, h) => {
  var userName = req.payload.userName;
  var userEmail = req.payload.userEmail;
  var userPassword = req.payload.userPassword;
  const somevar = new Promise(async (resolve, reject) => {
    console.log(userName, userEmail, userPassword);
    const response = h.response("created");
    resolve(response);
  });
  return somevar;
};

module.exports = { signup };
