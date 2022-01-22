const schema = require('./userpattern')
const middleware = (req, res, next) => {
    console.log('req',req.body)
    const { userName, userEmail, userPassword, isAdmin } = req.body;
    
    const { error } = schema.validate({ userName,userEmail, userPassword,isAdmin});
    if (error) {
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
            case "isAdmin":
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