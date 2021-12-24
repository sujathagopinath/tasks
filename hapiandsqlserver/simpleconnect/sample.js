const Hapi = require('@hapi/hapi')

const dbconnect = require('./config')
dbconnect();

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 8000
    })

  await server.start();
    console.log('Server started at 8000')
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();