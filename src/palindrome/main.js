const palindrome = require('./palindrome');

let args = process.argv.slice(2);

let result = palindrome(args[0]);

console.log(result);
