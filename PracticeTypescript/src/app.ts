import { Invoices } from './classes/invoices.js'
import { Payments } from './classes/payments.js'
import { Format } from './interfaces/format.js'
import { ListTemplate } from './templates/listtemplate.js'

let docOne: Format
let docTwo: Format
docOne = new Invoices('kala', 'current', 3000)
docTwo = new Payments('karan', 'save', 3500)

let docs: Format[] = [];
docs.push(docOne)
docs.push(docTwo)

console.log(docs)

interface Iscustomer {
    name: string,
    speak(a: string): void,
    spend(a: number): number
}

const data: Iscustomer = {
    name: 'sujatha',
    speak(text: string): void {
        console.log(text)
    },
    spend(amount: number): number {
        console.log(amount)
        return amount
    }
}

console.log(data)

const greetPerson = (person: Iscustomer) => {
    console.log(person.name)
}

greetPerson(data)



const invOne = new Invoices('mary', 'savings', 2000)
let invoice: Invoices[] = []
invoice.push(invOne)
console.log(invoice)

invoice.forEach((inv) => {
    console.log(inv.format())
})

const form = document.querySelector('.new-item-form') as HTMLFormElement
const type = document.querySelector("#type") as HTMLSelectElement
const toform = document.querySelector("#tofrom") as HTMLInputElement
const details = document.querySelector("#details") as HTMLInputElement
const amount = document.querySelector("#amount") as HTMLInputElement

const ul = document.querySelector('ul')!
const allitem = new ListTemplate(ul)

form.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    let doc: Format
    if (type.value == 'invoice') {
        doc = new Invoices(toform.value, details.value, amount.value)
    }
    else {
        doc = new Payments(toform.value, details.value, amount.value)

    }
    console.log(doc)
    console.log(type.value, toform.value, details.value, amount.value)

    allitem.render(doc, type.value, 'end')
})

//generics

const adduuid = <T extends { name: string }>(obj: object) => {
    const uuid = Math.floor(Math.random() * 100)
    return { ...obj, uuid };
}

const docone = adduuid({ name: 'you', age: 26 })
console.log(docone)

interface uuuid<T> {
    name: string,
    uid: number,
    data: T
}

const doctwo: uuuid<string> = {
    name: 'tina',
    uid: 2,
    data: 'sha'
}

console.log(doctwo)

//enums
enum ResourceType { 'BOOK', 'AUTHOR', 'PERSON' }

interface Resource<T> {
    uid: number,
    resourcetype: ResourceType,
    data: T
}

const docThree: Resource<object> = {
    uid: 4,
    resourcetype: ResourceType.AUTHOR,
    data: { name: "value" }
}

console.log(docThree)