"use strict";
exports.__esModule = true;
exports.Invoices = void 0;
var Invoices = /** @class */ (function () {
    // client: string;
    // details: string;
    // account: number|string;
    function Invoices(client, //access modifiers
    details, account) {
        this.client = client;
        this.details = details;
        this.account = account;
    }
    //method 
    Invoices.prototype.format = function () {
        return "Hi ".concat(this.client, " has ").concat(this.account, " for ").concat(this.details);
    };
    return Invoices;
}());
exports.Invoices = Invoices;
