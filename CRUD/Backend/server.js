const Hapi = require('@hapi/hapi')
const dbConnect = require('./config/dbConnect')
// const routes = require('./routes/Userroute')
var  Db = require('./controllers/dbOperations');
var  User = require('./User')
var sql = require('mssql')

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
        path: '/users',
        config: {
            handler: (request, h) => {
                var sql = "select * from Employee";
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    return h.response(result);
                });
            },
            // validate: {
            //     failAction: Relish.failAction,
            // }
        }
    });

    server.route({
        method: 'GET',
        path: '/get',
        handler: function (req, h) {
            const dsql = sql.connect(dbConnect, function () {
                var request = new dsql.Request();
                request.query('select * Employee', function (err, recordset) {
                      if (err) console.log(err);
                        return h(JSON.stringify(recordset));
                 })
            })
        }
    })

    server.route({
        path: '/add',
        method: 'POST',
        config: {
             handler: async (req, reply) => {
            let user = { ...req.payload }
            Db.addUser(user).then(data => {
             reply(data);
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
