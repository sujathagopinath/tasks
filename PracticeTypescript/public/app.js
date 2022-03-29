"use strict";
exports.__esModule = true;
var invoices_js_1 = require("../src/classes/invoices.js");
var invOne = new invoices_js_1.Invoices("mary", "savings", 2000);
var invoice = [];
invoice.push(invOne);
console.log(invoice);
invoice.forEach(function (inv) {
  console.log(inv.format());
});
var form = document.querySelector(".new-item-form");
var type = document.querySelector("#type");
var toform = document.querySelector("#tofrom");
var details = document.querySelector("#details");
var amount = document.querySelector("#amount");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(type.value, toform.value, details.value, amount.value);
});
