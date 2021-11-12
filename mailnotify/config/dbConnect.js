const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    mongoose.connect(
      "mongodb://localhost:27017/MailNotify",
      {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      },
      () => {
        console.log('DB connected');
      }
    );
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = dbConnect;


