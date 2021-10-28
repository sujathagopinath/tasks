class data {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getdata = () => {
        return `name:${this.name} and age:${2021 - this.age}`
    }
}

var person = new data('riya', 21);
console.log(person.getdata());