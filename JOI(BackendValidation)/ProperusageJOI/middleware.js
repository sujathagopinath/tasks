const schema = require('./schema')
const middleware = (req, res, next) => {
    const { title, content } = req.body;
    const { error } = schema.validate({ title, content });
    if (error) {
        switch (error.details[0].context.key) {
            case "title":
                res.status(400).json({ message: error.details[0].message });
                break;
            case "content":
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