import Student from './student.mjs';

class Data {
    static main() {
        console.log('hello world');

        let std = new Student(10, 'riya');


        console.log(std.getdata());
    }
}
Data.main();