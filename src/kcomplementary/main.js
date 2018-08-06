const kComplementary = require('./kcomplementary');

let args = process.argv.slice(2);
let K = args[0];
let array = JSON.parse(args[1]);

let count = kComplementary(K,array);

console.log(count);
