const os = require('os');

console.log('OS platform:', os.platform());

console.log('OS CPU architecture:', os.arch());

console.log('# of logical CPU cores', os.cpus().length);