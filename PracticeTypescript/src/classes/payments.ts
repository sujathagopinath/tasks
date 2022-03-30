import { Format } from '../interfaces/format.js'

export class Payments implements Format {
    // client: string;
    // details: string;
    // account: number|string;

    constructor(
        readonly recipent: string,      //access modifiers
        private details: string,
        public account: number | string
    ) { }

    //method 
    format() {
        return `Hi ${this.recipent} has owes ${this.account} for ${this.details}`
    }
}