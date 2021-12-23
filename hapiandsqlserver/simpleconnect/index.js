const Hapi = require('@hapi/hapi')
// const mssql = require('mssql')
// const dotenv = require("dotenv");
// dotenv.config();
// const dbconnect = require('./config')
// dbconnect();

var sql = require('mssql');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES; 

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    })

 var Connection = require('tedious').Connection;

    var config = {
        user: "sa",
        password: "Aspire@123",
        server: "localhost\\MSSQLSERVER",
        port:1433,
        options: {
            database: "SOURCE",
            validateBulkLoadParameters:false,
            encrypt: true,
        },
    }
 var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        console.log("Connected"); 
        executeStatement();     
    }); 

    function executeStatement() {  
        request = new Request("select getdate();", function(err) {  
        if (err) {  
            console.log(err);}  
        });
    //  var result = "";  
    //     request.on('row', function(columns) {  
    //         columns.forEach(function(column) {  
    //           if (column.value === null) {  
    //             console.log('NULL');  
    //           } else {  
    //             result+= column.value + " ";  
    //           }  
    //         });  
    //         console.log(result);  
    //         result ="";  
    //     });  

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
    console.log('Server started at 8000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();


