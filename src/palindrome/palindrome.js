/**
 * palindrome
 * @param {string} str
 */
const palindrome = (str) => {
  if (!str) {
    return false;
  }
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    if (str[start++] != str[end--]) {
      return false;
    }
  }
  return true;
};
module.exports = palindrome;
