const xml = require('fs').readFileSync('./src/weather.wsdl', 'utf8');
const http = require('http');
const soap = require('soap');
let port = '8000'
var args = { sector: 'conus' };

let weather = {
    Weather: {
        ndfdXMLPortType: {
            CornerPoints: (() => {
                console.log('result')
            })
        }
    }
}
console.log(weather.Weather.ndfdXMLPortType.CornerPoints())

export const server = http.createServer(()=> {
   console.log('Not found')
});

server.listen(port);
soap.listen(server, '/wsdl', weather, xml, function () {
    console.log(`https://localhost:${port}/wsdl?wsdl`);
});