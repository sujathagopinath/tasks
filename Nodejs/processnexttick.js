const slowAdd = (a, b) => {
    setTimeout(() => {
        console.log(a + b);
    }, 0)
};
slowAdd(3, 3);
slowAdd(4, 4);   //timers -> I/O call backs -> idle -> poll -> check -> close call backs -> incoming connections, data etc


const f1 = function (f) {
    console.log(f);
}
console.log('start');
setTimeout(function () {
    console.log('setTimeout');
}, 0);
process.nextTick(f1, 'process.nextTick');
setImmediate(f1, 'setImmediate');
console.log('Finish');