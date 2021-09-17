const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        mongoose.connect(
            "mongodb://localhost:27017/validation", {
            useNewUrlParser: true
        },
            () => {
                console.log('DB connected');
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;


