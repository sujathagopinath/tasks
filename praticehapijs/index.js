const Hapi = require('@hapi/hapi')
const request = require('request')

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
            plugin: require("@hapi/cookie"),
        },
        {
            plugin: require("@hapi/basic"),
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
    server.auth.strategy('login', 'cookie', {
        cookie: {
            name: 'session',
            password: 'socccersoccersoccersoccerccersocc',
            isSecure: false
        },
        redirectTo: '/login',
        validateFunc: async (request, session) => {
            if (session.username === 'test', session.password ==='sujatha') {
                return {valid:true}
            }
            else {
                return {valid:false}
            }
        }
    })
    server.auth.default('login')

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
        },
        options: {
            auth: {
                mode:'try'
            }
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
        path: '/logout',
        method: 'GET',
        handler: (request, h) => {
           return h.view('login') 
        }
    })

    server.route({
        path:'/login',
        method: 'POST',
        handler: (request, h) => {
            // return h.view('index',{username:request.payload.username})
            if (request.payload.username === 'test' && request.payload.password === 'sujatha') {
            console.log('username:',request.payload.username)
                request.cookieAuth.set({
                    username: request.payload.username,
                    password: request.payload.password
                })
                return h.redirect('/welcome')
            }
            else {
               return h.redirect('/vision')
            }
        },
        options: {
            auth: {
                mode:'try'
            }
        }
    })

    server.route({
        path:'/welcome',
        method: 'GET',
        handler: (req, res) => {
            return res.view('login')
        }
    })

    server.route({
        path: '/{any*}',
        method: 'GET',
        handler: (request, h) => {
           return '<h2>Oh No You Lost</h2>'
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
    

    await server.start();
    console.log('Server started at 4000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();
