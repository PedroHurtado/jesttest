const kComplementary = require('./kcomplementary');

let args = process.argv.slice(2);

let count = kComplementary(args[0], JSON.parse(args[1]));

console.log(count);
