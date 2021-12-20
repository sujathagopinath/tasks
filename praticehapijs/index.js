const Hapi = require('@hapi/hapi')

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 4000,

    })

    await server.register([
        {
            plugin: require("@hapi/vision"),
           
        },
        {
            plugin: require("good"),
            Options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    console: [
                        {
                            module: 'good-squeeze',
                            name: 'Squeeze',
                            args: [{ log: '*', response: '*',request:'*' }]
                        },
                        {
                            module:'good-console'
                        },
                        'stdout'
                    ]
                }
            }
        }
    ])

    server.views({
        engines: {
            html: {
                module: require('handlebars'),
                compileMode: 'sync'
            }
        },
        relativeTo: __dirname,
        path: 'templates',
        layoutPath: 'templates/layout/layout',
        context: {
            content:"this a contents"
        }
    })

    server.route({
        path: '/vision',
        method: 'GET',
        handler: (request, h) => {
           return h.view('index',{title:'new title'}) 
        }
    })

    server.route({
        path: '/layout',
        method: 'GET',
        handler: (request, h) => {
           return h.view('layout') 
        }
    })

    server.route({
        path:'/',
        method: 'GET',
        handler: (req, res) => {
            return 'Hello world'
        }
    })

    server.route({
        path: '/request',
        method: 'GET',
        handler: (request, res) => {
            request.log('error', 'Error event')
            return 'Request Log Method'
        }
    })
    // Server methods
    const add = (a, b) => (a + b);
    server.method('Addition', add, { cache: { expiresIn: 2000, generateTimeout: 100 } });

    console.log(await server.methods.Addition(2, 5));
    
    //object server methods
    const sumarray = function (array) {
        let sum = 0
        array.forEach((item) => {
            sum+=item
        })
        return sum
    }
    const options = {
        cache: { expiresIn: 2000, generateTimeout: 100 },
        generatekey:(array)=>array.join(',')
    }

    server.method('sum', sumarray, {})
    console.log(await server.methods.sum([4,5]))
// end of server methods
    
    const onRequest = function (request, h) {   ///To change all request to GET
        request.setMethod('GET')
        return h.continue
    };
    server.ext('onRequest',onRequest)

    await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
