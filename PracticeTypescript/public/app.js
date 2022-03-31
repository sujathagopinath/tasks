import { Invoices } from './classes/invoices.js';
import { Payments } from './classes/payments.js';
import { ListTemplate } from './templates/listtemplate.js';
let docOne;
let docTwo;
docOne = new Invoices('kala', 'current', 3000);
docTwo = new Payments('karan', 'save', 3500);
let docs = [];
docs.push(docOne);
docs.push(docTwo);
console.log(docs);
const data = {
    name: 'sujatha',
    speak(text) {
        console.log(text);
    },
    spend(amount) {
        console.log(amount);
        return amount;
    }
};
console.log(data);
const greetPerson = (person) => {
    console.log(person.name);
};
greetPerson(data);
const invOne = new Invoices('mary', 'savings', 2000);
let invoice = [];
invoice.push(invOne);
console.log(invoice);
invoice.forEach((inv) => {
    console.log(inv.format());
});
const form = document.querySelector('.new-item-form');
const type = document.querySelector("#type");
const toform = document.querySelector("#tofrom");
const details = document.querySelector("#details");
const amount = document.querySelector("#amount");
const ul = document.querySelector('ul');
const allitem = new ListTemplate(ul);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let doc;
    if (type.value == 'invoice') {
        doc = new Invoices(toform.value, details.value, amount.value);
    }
    else {
        doc = new Payments(toform.value, details.value, amount.value);
    }
    console.log(doc);
    console.log(type.value, toform.value, details.value, amount.value);
    allitem.render(doc, type.value, 'end');
});
//generics
const adduuid = (obj) => {
    const uuid = Math.floor(Math.random() * 100);
    return Object.assign(Object.assign({}, obj), { uuid });
};
const docone = adduuid({ name: 'you', age: 26 });
console.log(docone);
const doctwo = {
    name: 'tina',
    uid: 2,
    data: 'sha'
};
console.log(doctwo);
//enums
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["BOOK"] = 0] = "BOOK";
    ResourceType[ResourceType["AUTHOR"] = 1] = "AUTHOR";
    ResourceType[ResourceType["PERSON"] = 2] = "PERSON";
})(ResourceType || (ResourceType = {}));
const docThree = {
    uid: 4,
    resourcetype: ResourceType.AUTHOR,
    data: { name: "value" }
};
console.log(docThree);
