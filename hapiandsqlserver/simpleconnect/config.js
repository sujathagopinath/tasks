const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: 'Aspire@123',
    database: 'SOURCE',
  server: 'localhost',
  port: 1433, 
    driver: 'tedious',
    dialect: "mssql",
    dialectOptions: {
        instanceName: "SQLEXPRESS"
    },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, 
    trustServerCertificate: false 
  }
}

const dbconnect = async () => {
 try {
  await sql.connect(sqlConfig)
  const result = await sql.query`select employeeid,employeename from Employee`
  console.dir("results",result)
 } catch (err) {
 console.log("error",err)
 }
}

module.exports = dbconnect;


// const sql = require('mssql');

// const dbConfig = {
//     server: 'localhost',
//     database: 'SOURCE',
//     user: 'sa',
//     password:'Aspire@123'
// }

// const SqlConnection = (request, h) => {
//     sql.connect(dbConfig, ((err) => {
//                 if (err) {
//                     console.log(err);
//         }
//     }));
//     console.log('connected')
// }

// module.exports = SqlConnection;