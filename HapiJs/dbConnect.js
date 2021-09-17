const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        mongoose.connect(
            "mongodb://localhost:27017/HapiiJs",
            {
                useFindAndModify: false,    //true by default
                useUnifiedTopology: true,   //false by default
                useCreateIndex: true,       //false by default
                useNewUrlParser: true,
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


