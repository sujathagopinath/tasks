const crypto = require('crypto');

console.log("Hashes: ", crypto.getHashes());
console.log("Ciphers: ", crypto.getCiphers());

const secret = "Cryptograpghy";
const hash = crypto.createHmac('sha256', secret).digest('hex');
console.log(hash);

let plaintext = 'PEN';
let key = '12345678123456781234567812345678';
let iv = crypto.randomBytes(16);

let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(plaintext, 'utf-8', 'hex');
encrypted += cipher.final('hex');

console.log(`encrypted: ${encrypted}`);