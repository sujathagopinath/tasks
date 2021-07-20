const os = require('os');

const totalmemory = os.totalmem();

const freememory = os.freemem();

const eol = os.EOL;

const arch = os.arch();

const constant = os.constants;

const cpus = os.cpus();

const endianness = os.endianness();

console.log("Totalmemory: ", totalmemory);
console.log("Freememory: ", freememory);
console.log(`This is a ${eol}new line`)
console.log("Architecture: ", arch);  //returns the CPU arch like arm, x32, x64
console.log("Constants: ", constant.priority.PRIORITY_ABOVE_NORMAL);  //returns the error codes and processing signals and make the configuration easier
console.log("CPUS: ", cpus); // returns process and return the array of all available logical codes. Each code has defimed as object,models
console.log("Endianness: ", endianness);