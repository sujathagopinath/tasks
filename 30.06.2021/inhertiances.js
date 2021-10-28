class data {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getdata = () => {
        return `name:${this.name} and age:${2021 - this.age}`
    }
}

const person = new data('riya', 21);
console.log(person.getdata());

// class data1 {
//     constructor(exp, dept) {
//         this.experience = exp;
//         this.type = dept;
//     }
//     getdata1 = () => {
//         return `experience:${this.experience} and type:${this.type}`

//     }
// }
// var people = new data1(10, 'development');
// console.log(people.getdata1());


class data1 extends data {
    constructor(name, age, exp, dept) {
        super(name, age);
        this.experience = exp;
        this.type = dept;
    }
    getdata1 = () => {
        return `${this.getdata()} and Experience: ${this.experience} and type: ${this.type}`;
    }

}
const details = new data1('riya', 21, 10, 'private');
console.log(details);
details.getdata1();