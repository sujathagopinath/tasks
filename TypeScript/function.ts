let greet: Function;

greet = () => {
    console.log("Heelo again")
}

const add = (a: number, b: number, c:number|string) : void=> {
    console.log(a,b)
}

add(5, 9,'7')

function customerData(custdata: string[]): void {
    custdata.forEach(cust => {
      console.log(cust)
    })
}

let custInfo:string[] =["heelo","kitty"]
customerData(custInfo)
