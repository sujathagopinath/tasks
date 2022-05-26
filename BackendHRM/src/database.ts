var sqlDb = require("mssql");
import { dbConfig } from './config/settings'

const poolPromise = new sqlDb.ConnectionPool(dbConfig._instance.db)
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
