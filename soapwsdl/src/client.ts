var soap = require('soap');
import {server} from './server'
// var url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl'\
var url = 'https://localhost:8000/wsdl?wsdl'
var args = { sector: 'conus' };
// var fs = require('fs')
// fs.readFileSync('./src/weather.wsdl', { encoding: 'utf8' }, (err: any, data: any) => {
//     console.log(data)
// });

// soap.createClient(fs, {}, function (err: any, client: any) {
//     client.CornerPoints(args, (err: any, result: any) => {
//         console.log(result)
//     })
//     console.log(client)
// })

soap.createClient(url, {}, function (err: any, client: any) {
    // client.(args, (err: any, result: any) => {
    //     console.log(result)
    // })
    console.log(client,url)
})




