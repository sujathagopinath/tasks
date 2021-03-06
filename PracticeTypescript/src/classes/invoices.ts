import { Format } from '../interfaces/format.js'

export class Invoices implements Format {
    // client: string;
    // details: string;
    // account: number|string;

    constructor(
        readonly client: string,      //access modifiers
        private details: string,
        public account: number | string
    ) { }

    //method 
    format() {
        return `Hi ${this.client} has ${this.account} for ${this.details}`
    }
}