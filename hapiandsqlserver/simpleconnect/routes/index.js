const mssql = require('mssql')
const config = require('../config')
module.exports.register = async server => {

            server.route({
                path: '/test',
                method: 'GET',
                handler: (req, h) => {
                    return 'Testing'
                }
            })

            server.route({
                path: '/',
                method: 'GET',
                handler: (req, h) => {
                    
                
                    mssql.connect(config, function (err) {
 
                        var request = new mssql.Request();
 
                        request.query('select * from Employee',
                            function (err, records) {
 
                                if (err) console.log(err)
 
                                console.log("records", records);
                                // return records;
                            });
                    });
                }
            })
        }   