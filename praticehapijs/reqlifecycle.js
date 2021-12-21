const Hapi = require('@hapi/hapi'),
      Request = require('request-promise')
const Crypto = require('crypto') 

const init = async () => {
    const server = Hapi.server({
        host: 'localhost',
        port:8080
    })

    server.route({
        method: 'GET',
        path: '/employees',
        handler: function(req, h) {
            return Request('http://dummy.restapiexample.com/api/v1/employees', function (error, response, body) {
                console.log('response:', response);
            });
        }
    })

    server.ext('onRequest', function(request, h){
        console.log('inside onRequest');
        return h.continue;
    })
    
    server.ext('onPreAuth', function(request, h){
        console.log('inside onPreAuth');
        return h.continue;
    });

    server.ext('onCredentials', function(request, h){
        console.log('inside onCredentials');
        return h.continue;
    });

    server.ext('onPostAuth', function(request, h){
        console.log('inside onPostAuth');
        return h.continue;
    });

    server.ext('onPreHandler', function(request, h){
        console.log('inside onPreHandler');
        return h.continue;
    });

    server.ext('onPostHandler', function(request, h){
        console.log('inside onPostHandler');
        return h.continue;
    });

    server.ext('onPreResponse', function(request, h){
        console.log('inside onPreResponse');
        return h.continue;
    });

    const onRequest = function (request, h) {
        const hash = Crypto.createHash('sha1')
        request.events.on('peek', (chunk) => {
            hash.update(chunk)
        })
        request.events.once('finish', () => {
            console.log("data",hash.digest('hex'))
        })

        request.events.once('disconnect', () => {
            console.log('request aborted')
        })

        return h.continue
    }

    server.ext('onRequest',onRequest)

    

    await server.start()
    console.log('server is started at 8080')
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

init();