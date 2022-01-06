const schema = require('./userpattern')
const middleware = (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    const { error } = schema.validate({ userEmail, userPassword});
    if (error) {
        switch (error.details[0].context.key) {
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
    return next();
};

module.exports = middleware