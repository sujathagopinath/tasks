const buf = Buffer.from('hello');
const buff = Buffer.alloc(4) //Allocating the memory space from the varaiable
buff.write("newarray");


console.log(buf);
console.log(buf.toString());

console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);

console.log(buff);
buff[1] = 111;
console.log(buff.toString());

const range = buf.subarray(0, 2)
console.log(range.toString())