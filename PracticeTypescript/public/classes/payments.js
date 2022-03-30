export class Payments {
    // client: string;
    // details: string;
    // account: number|string;
    constructor(recipent, //access modifiers
    details, account) {
        this.recipent = recipent;
        this.details = details;
        this.account = account;
    }
    //method 
    format() {
        return `Hi ${this.recipent} has owes ${this.account} for ${this.details}`;
    }
}
