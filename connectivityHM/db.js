"use strict";
    
var sql = require('mssql')

var config = {
    "user": "sa", //default is sa
    "password": "aspire@123",
    "server": "ASPIREVM12-24", // for local machine
    "database": "hapijs", // name of database
    "driver": "tedious",
    "options": {
        "encrypt": true,
        "trustServerCertificate": true
    }
}

function getEmp() {
    var conn = new sql.ConnectionPool(config);
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        req.query("select * from Employee", function (err, data) {

            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
            conn.close();
        })
    })
}

getEmp();

