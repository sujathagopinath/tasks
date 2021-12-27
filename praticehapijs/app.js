console.log("Hello world, This is an app to connect to sql server.");
var sql = require('mssql')
var config = {
    "user": "sa", //default is sa
    "password": "aspire@123",
    "server": "ASPIREVM12-24", // for local machine
    "database": "source", // name of database
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
}

sql.connect(config, err => { 
    if(err){
        throw err ;
    }
    console.log("Connection Successful !");

    new sql.Request().query('select 1 as number', (err, result) => {
        //handle err
        console.dir(result)
        // This example uses callbacks strategy for getting results.
    })
        
});

sql.on('error', err => { 
    console.log("Sql database connection error " ,err);
})






// const sql = require('mssql')
// const config =
//     {
//     database: 'SOURCE',
//     server: 'ASPIREVM12-24',
//     user:'sa',
//     password: 'aspire@123',
//     driver: 'tedious',
//     options: {
//         trustedConnection: true,
//          encrypt: true,
//         trustServerCertificate: true
//     }
// }

// const poolPromise = new sql.ConnectionPool(config).connect()
//     .then(pool => {
//         console.log('Connected to MSSQL');
//         return pool
//     })
//     .catch(err => console.log('Database Connection Failed! Bad Config: ', err))
// module.exports = { sql, poolPromise }