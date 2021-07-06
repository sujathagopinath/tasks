let asyncandawait = new Promise((resolve, reject) => {
    setTimeout(() => resolve(0), 1000);
});

async function details() {
    console.log('a');
    let data = await asyncandawait;
    console.log('Inside async ' + data);
    console.log('b');
}
details();