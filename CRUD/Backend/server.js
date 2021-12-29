const Hapi = require('@hapi/hapi')
const dbConnect = require('./config/dbConnect')
// const routes = require('./routes/Userroute')
var  Db = require('./controllers/dbOperations');
var  User = require('./User')
var sql = require('mssql')
const Relish = require('relish')
const { promisify } = require('util');

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 3001,
        routes: {
            cors: {
                origin: ['*'],
                credentials: true
            }
        }

    })

    server.route({
        path: '/employee',
        method: 'GET',
        handler: (req, h) => {
            return 'Testing'
        }
    })

    
    server.route({
        method: 'GET',
        path: '/get',
        config: {
            handler: function (req, h) {
                const query = promisify(dbConnect.query);
                // const dsql = sql.connect(dbConnect, function () {
                //       new sql. Request().query('select * from Employee', function (err, recordset) {
                //         if (err) console.log(err);
                //         return h.response(recordset);
                //     })
                // })
                return query('SELECT * from Employee')
                    .then(result => { // do something with sql result
                        return result
                        console.log("results",result)
                    })
            }
        },
        // validate: {
        //     failAction: Relish.failAction,
        // }  
    })

    server.route({
        path: '/getdata/{Code?}',
        method: 'GET',
        config: {
            handler: function (req, h) {
                // const query = promisify(dbConnect.query);
                var Code = req.params.Code
                console.log('code',Code)
                new sql.Request()
                    .input("params", sql.Int, Code)
                    .query(`select * from Employee where Code = @params`)
                    .then(function (dbData) {
                        if (dbData == null || dbData.length === 0)
                            return;
                        console.dir(`Employee with Code ${Code}`);
                        console.dir(dbData);
                    })
                    .catch(function (error) {
                        console.dir(error);
                    });
            }
        }
    })

    server.route({
        path: '/insert',
        method: 'POST',
        config: {
            handler: async function(req,h) {
                var dbConn = new sql.ConnectionPool(dbConnect,
                    function (err) {
                        var myTransaction = new sql.Transaction(dbConn);
                        myTransaction.begin(function (error) {
                            var rollBack = false;
                            myTransaction.on('rollback',
                                function (aborted) {
                                    rollBack = true;
                                });
                            new sql.Request(myTransaction)
                                .query("INSERT INTO Employee VALUES ('104','varun','Analyst',23000,'Developer')",
                                    function (err, recordset) {
                                        if (err) {
                                            if (!rollBack) {
                                                myTransaction.rollback(function (err) {
                                                    console.dir(err);
                                                });
                                            }
                                        } else {
                                            myTransaction.commit().then(function (recordset) {
                                                console.dir('Data is inserted successfully!');
                                            }).catch(function (err) {
                                                console.dir('Error in transaction commit ' + err);
                                            });
                                        }
                                    });
                        });
                    })
            }
        }
    })
   
    server.route({
        method: 'GET',
        path: '/adduser',
        config: {
            handler: function (req, h) {
                const query = promisify(dbConnect.query);
                return sql.query("INSERT INTO Employee VALUES ('104','varun','Analyst',23000,'Developer')")
                    .then(result => {
                        return result
                        console.dir('Data inserted',result)
                    }).catch(err => {
                        console.log('error',err)
                    })
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/delete/{code?}',
        config: {
            handler:function (req,h) {
                // const query = promisify(dbConnect.query)
                var Code = req.params.Code
                return sql.query(`DELETE FROM Employee WHERE Code =  ${Code}`  )
                    .then(result => {
                        return result.recordset
                    }).catch(err => {
                       console.log('error',err)
                    })
            }
        }
    })

    
    
await server.start();
    console.log('Happi server started at 3001')
    }

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
