const schema = require("./userpattern");
const userValidation = (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;
  const { error } = schema.validate({
    userName,
    userEmail,
    userPassword,
  });
  if (error) {
    console.log(error);
    switch (error.details[0].context.key) {
      case "userName":
        res.status(400).json({ message: error.details[0].message });
        break;
      case "userEmail":
        res.status(400).json({ message: error.details[0].message });
        break;
      case "userPassword":
        res.status(400).json({ message: error.details[0].message });
        break;
      default:
        res.status(500).json({ message: "An error occurred." });
        break;
    }
  }
  next();
};

module.exports = userValidation;
