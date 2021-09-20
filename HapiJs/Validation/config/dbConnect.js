const mongoose = require('mongoose');

const dbConnect = async () => {
    mongoose.connect(
        "mongodb://localhost:27017/validation", {
        useNewUrlParser: true
    }).then(() => {
        console.log("DB Connected")
    }).catch((error) => {
        console.log(error)
    })


};

module.exports = dbConnect;


