const Hapi = require('@hapi/hapi')

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 5000,
    })

    await server.register({
        plugin: require('@hapi/cookie')
    })

    server.route({
        method: 'GET',
        path: '/home',
        options: {
            state: {
                parse: true,
                failAction: 'log'
            },
            handler: async (req, h) => {
                const value = req.state.data;
                h.state('testcookie', {
                    ttl: 1000 * 60 * 60 * 24,
                    encoding: 'base64json',
                    isSecure: false,
                    isHttpOnly: true,
                    clearInvalid: false,
                    strictHeader: true
                })
                return h.response('hello')
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/log',
        handler: function (request, h) {

            request.log('error', 'Event error');
            return 'Hello World';
        }
    });

    await server.start();
    console.log('Server started at 5000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();