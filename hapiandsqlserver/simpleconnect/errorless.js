const Hapi = require('@hapi/hapi')

var sql = require('mssql');
var Request = require('tedious').Request;
// var TYPES = require('tedious').TYPES; 

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4000
    })

 var Connection = require('tedious').Connection;

    var dbconfig = {
        user: "sa",
        password: "Aspire@123",
        server: "localhost",
        port: 1433,
        options: {
            database: "SOURCE",
            encrypt: false,
            trustServerCertificate: false,
            dialect: "mssql",
            dialectOptions: {
                instanceName: "SQLEXPRESS"
            }
        },
    }
 var connection = new Connection(dbconfig);
    connection.on('connect', function(err) {
        console.log("Connected");
        executeStatement();
    });

    function executeStatement() {
        request = new Request("select getdate();", function(err) {
        if (err) {
            console.log(err);}
        });
        connection.execSql(request);
    };

  

server.route({
    method: 'GET',
    path:'/welcome',
    handler: function (request, reply) {
    return reply('hello world');
}
});

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
       connection.query('SELECT employeeid, employeename FROM Employee',
       function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  }
});
    
await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
