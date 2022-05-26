import { Server, ResponseToolkit } from "@hapi/hapi";
var soap = require('soap');
var http = require('http')

var myService = {
    GlobalWeather: {
        GlobalWeatherSoap: {
            GetWeather: function (args: any, callback: any) {
                callback({
                    name1: args.CountryName,
                    name5: args.CityName
                });
            },
            GetCitiesByCountry: function (args: any, callback: any) {
                callback({
                    name2: args.CountryName
                });
            }
        },
    }
};


// const init = async () => {
//     const server: Server = new Server({
//         port: 3000,
//         host: 'localhost'
//     });

var xml = require('fs').readFileSync('./src/globalweather.wsdl', 'utf8');
;
// await server.start();
// console.log('Server running on %s', server.info.uri);

var server = http.createServer(function (request: Request, h: ResponseToolkit) {
    return h.response('Not found')
})
soap.listen(server, '/wsdl', myService, xml, () => {
    console.log('8000')
});

// }
// process.on('unhandledRejection', (err) => {
//     console.log(err);
//     process.exit(1);
// });
// init()
