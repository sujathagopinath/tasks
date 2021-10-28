class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getdata() {
        return `id : ${this.id} And name: ${this.name}`;
    }
}
export default Student;