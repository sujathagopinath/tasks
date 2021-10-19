const myPromise = new Promise((resolve,reject)=>{
    let condition = true ;  
    
    if(condition) {    
        resolve('Promise is resolved successfully.');  
    } else {    
        reject('Promise is rejected');  
    }
});

myPromise.then((message) => {
    console.log(message);
}).catch((message)=>{
    console.log(message);
});

