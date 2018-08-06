const palindrome = require('./palindrome');

let word = process.argv.slice(2)[0];

let result = palindrome(word);

console.log(result);
