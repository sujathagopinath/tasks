import { Invoices } from "../public/classes/"

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

form.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    console.log(type.value, toform.value, details.value, amount.value)

})

