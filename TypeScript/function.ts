function customerData(custdata: string[]): void {
    custdata.forEach(cust => {
      console.log(cust)
    })
}

let custInfo:string[] =["heelo","kitty"]
customerData(custInfo)