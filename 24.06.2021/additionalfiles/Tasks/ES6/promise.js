//syntax

// const promise = new promise((resolve,reject)=>{
//     resolve();
//     reject();
// });
// promise.then().catch();

// const myPromise = new Promise((resolve, reject) => {
//     let condition = true;

//     if (condition) {
//         resolve('Promise is resolved successfully.');
//     } else {
//         reject('Promise is rejected');
//     }
// });

// myPromise.then((message) => {
//     console.log(message);
// }).catch((message) => {
//     console.log(message);
// });

//callback in promise

let promise = new Promise((resolve, reject) => {
    // resolve(2);
    resolve(0);
    reject();
});

promise.then((data) => {
    console.log('then ' + data);
    // return 3;
    return data + 1;
})
    .then((data) => {
        console.log(data);
        // return 4;
        return data + 1;
    })

    .then((data) => {
        console.log(data);
        // return 5;
        return data + 1;
    })

    .catch((err) => {
        console.log('Error ' + err);
    })

