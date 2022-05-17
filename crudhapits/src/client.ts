var soap = require('soap');
var url = 'http://example.com/wsdl?wsdl';
var args = { name: 'value' };
soap.createClient(url, function (err: any, client: any) {
    client.MyFunction(args, function (err: any, result: any) {
        console.log(result);
    });
}); 