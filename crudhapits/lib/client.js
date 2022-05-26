"use strict";
var soap = require('soap');
var url = 'http://www.dneonline.com/calculator.asmx?wsdl';
var args = { name: 'value' };
soap.createClient(url, function (err, client) {
    client.MyFunction(args, function (err, result) {
        console.log(result);
    });
});
