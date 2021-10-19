function callback(num, cb) {
    var i;
    for (i = 0; i <= num; i++) {
        console.log(i);
    }
    cb(i)
}

callback(3, (lastnumber) => {
    console.log('this is last number' + lastnumber);
})