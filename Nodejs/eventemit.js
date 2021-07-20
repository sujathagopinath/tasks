var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('update', () => {
    console.log("data are emitted");
})
eventEmitter.emit('update');
