"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var soap = require('soap');
var http = require('http');
var myService = {
    GlobalWeather: {
        GlobalWeatherSoap: {
            GetWeather: function (args, callback) {
                callback({
                    name1: args.CountryName,
                    name5: args.CityName
                });
            },
            GetCitiesByCountry: function (args, callback) {
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
var server = http.createserver(function (request, h) {
    return h.response('Not found');
});
soap.listen(server, '/wsdl', myService, xml, () => {
    console.log('8000');
});
// }
// process.on('unhandledRejection', (err) => {
//     console.log(err);
//     process.exit(1);
// });
// init()
