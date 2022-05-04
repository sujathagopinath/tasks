var sqlDb = require("mssql");
var sqlDbSettings = require("./config/settings");

const poolPromise = new sqlDb.ConnectionPool(sqlDbSettings.dbConfig)
    .connect()
    .then((pool: any) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((err: any) => console.log("Database Connection Failed! Bad Config: ", err));

module.exports = {
    sqlDb,
    poolPromise,
};
