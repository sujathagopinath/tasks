const dotenv = require("dotenv");
dotenv.config();

var sql = require('mssql')
var config = {
    "user": process.env.USER, 
    "password": process.env.PASSWORD,
    "server": process.env.SERVER,
    "database": process.env.DATABASE, 
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
}

const dbConnect = sql.connect(config, err => {
    if (err) {
        throw err;
    }
    console.log("Connection made to sql server !");

    // new sql.Request().query('select 1 as number', (err, result) => {
    //     console.dir(result)
        
    // })

});

sql.on('error', err => {
    console.log("Sql database connection error ", err);
})

module.exports = dbConnect