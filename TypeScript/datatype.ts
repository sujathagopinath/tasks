let firstname: string
let age: number
let availbality: boolean
enum gender{ male = 1, female = 1, transgender = 3 }  //type declaration
let memberId: gender
let dataobj: any={
    "address": "Chennai",
    "number":11

}

let skillset : string[]=["c","react","js","ts"]

firstname = 'sujatha'
age = 18
availbality = true
memberId = gender.female

console.log(firstname, age, gender[memberId], memberId[0], dataobj,skillset[0])

skillset.forEach(skill => {
    console.log(skill)
})
let search = "ts"
console.log(skillset.filter(skill=>skill==search))