"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlDb = require("mssql");
const settings_1 = require("./config/settings");
const poolPromise = new sqlDb.ConnectionPool(settings_1.dbConfig._instance.db)
    .connect()
    .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
})
    .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));
module.exports = {
    sqlDb,
    poolPromise,
};
