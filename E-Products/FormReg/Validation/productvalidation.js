const schemas = require('./productpattern')
const productvalidation = (req, res, next) => {
    const { productname,price } = req.body;
    const { error } = schemas.validate({ productname,price });
    if (error) {
        switch (error.details[0].context.key) {
            case "productname":
                res.status(400).json({ message: error.details[0].message });
                break;
            case "price":
                res.status(400).json({ message: error.details[0].message });
                break;
            default:
                res.status(500).json({ message: "An error occurred." });
                break;
        }
    }
    return next();
};

module.exports = productvalidation