const Hapi = require('@hapi/hapi')
var sql = require('mssql')

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    })

    server.route({
        path: '/',
        method: 'GET',
        handler: (req, res) => {
            return "hello world";
        }
    })

    server.route({
        path: '/employee',
        method: 'GET',
        handler: function (req, h) {
          return getEmployees()
        }
    })
    
var dbConfig = {
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


function getEmployees() {
    var dbConn = new sql.ConnectionPool(dbConfig);
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
        request.query("select * from Employee").then(function (resp) {
            console.log(resp);
            dbConn.close();
        }).catch(function (err) {
            console.log(err);
            dbConn.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
}

await server.start();
    console.log('Server started at 8000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();