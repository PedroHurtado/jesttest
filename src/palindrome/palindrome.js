/**
 * palindrome
 * @param {wording} word
 * @return {boolean}
 */
const palindrome = (word) => {
  if (!word) {
    return false;
  }
  let start = 0;
  let end = word.length - 1;
  while (start < end) {
    if (word[start++] != word[end--]) {
      return false;
    }
  }
  return true;
};
module.exports = palindrome;
