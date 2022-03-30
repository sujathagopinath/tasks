export class Invoices {
    // client: string;
    // details: string;
    // account: number|string;
    constructor(client, //access modifiers
    details, account) {
        this.client = client;
        this.details = details;
        this.account = account;
    }
    //method 
    format() {
        return `Hi ${this.client} has ${this.account} for ${this.details}`;
    }
}
