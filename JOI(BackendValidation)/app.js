const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const check = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(30).required(),
        content: Joi.string().min(24).max(255).required(),
    });
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

app.post("/", check, (req, res) => {
    return res.json(req.body);
});

app.listen(4000, (req, res) => {
    console.log("Server is running on port 4000");
})