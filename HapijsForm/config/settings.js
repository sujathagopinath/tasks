const dotenv = require("dotenv");
dotenv.config();

exports.dbConfig = {
     "user": process.env.USER, 
    "password": process.env.PASSWORD,
    "server": process.env.SERVER,
    "database": process.env.DATABASE, 
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
};

