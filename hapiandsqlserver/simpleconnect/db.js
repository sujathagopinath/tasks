var sql = require('mssql')

var dbconfig = {
    user: "sa",
    password: "Aspire@123",
    server: "localhost",
    port: 1433,
    debug: true,
    driver: 'tedious',
    options: {
        database: "SOURCE",
        encrypt: true
    }
}

function getEmp() {
    var conn = new sql.ConnectionPool(dbconfig);
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        if (err) {
            console.log(err);
            return;
        }
        // req.query("select * from Employee", function (err, data) {

        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log(data);
        //     }
        //     conn.close();
        // })
    })
}

getEmp();

