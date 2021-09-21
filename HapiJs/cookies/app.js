const Hapi = require('@hapi/hapi')

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 5000,
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
                h.state('testcookie', {
                    ttl: 1000 * 60 * 60 * 24,
                    encoding: 'base64json'
                })
                return h.response({ message: 'hello' })
            }
        }

    })
    await server.start();
    console.log('Server started at 5000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();