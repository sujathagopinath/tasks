const path = require('path');

file = path.basename('test.txt');
// file = path.dirname('document/test.txt');
// file = path.isAbsolute('D:\sujatha\Training\tasks\Nodejs');

let dir = 'test'
newfile = path.join('C:', 'Users\sujatha.gopinath\Desktop', dir, 'test.css');
console.log(newfile);

// newfile = path.parse('test/test.css');
newfile = path.resolve('test/test.css');
console.log(newfile);

console.log(file);