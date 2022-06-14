"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var soap = require('soap');
var url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php?wsdl';
// var url = 'https://localhost:8000/wsdl?wsdl'
var args = { sector: 'conus' };
var fs = require('fs');
var path = require('path');
// const datas = fs.readFileSync(path.join(__dirname, 'weather.wsdl')).toString('utf8')
// console.log(datas)
// // const data = fs.readFileSync(path.join(path.join(__dirname, './src/wsdl'), 'weather.wsdl'), 'utf8');
// // // const data = fs.writeFileSync((path.resolve(__dirname, 'weather.wsdl')), datas, 'utf8');
// // console.log(data)
// soap.createClient(writeUTFBytes(datas.toXMLString()), {}, function (err: any, client: any) {
//     // client.CornerPoints(args, (err: any, result: any) => {
//     //     console.log(result)
//     // })
//     console.log(client)
// })
// function writeUTFBytes(arg0: any): any {
//     throw new Error('Function not implemented.');
// }
soap.createClient(url, {}, function (err, client) {
    client.CornerPoints(args, (err, result) => {
        console.log('res', result);
    });
});
// var file: File = dir.resolvePath(name + ".xml");
// var stream: FileStream = new FileStream();
// stream.open(file, FileMode.WRITE);
// stream.writeUTFBytes(getWsdl().toXMLString());
// stream.close();
// loadWSDL(file.url);
// 
