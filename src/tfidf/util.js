
const NORMALIZETERMS = /\.|\<|>|[=]|[@]|[+]|[-]|[_]|[%]|[\r\n]|[\n]|[\t]|[/\\\\]|=|\[|]|\{|}|,|;|!|\?|\¿|\(|\)|:|"|'|'$|“|”|‘|’/g;
/**
 * return normalize text for tfidf
 * @param {string} text
 * @return {Array<string>} array of string
 */
const normalizeTerms = (text) => {
  return text.replace(NORMALIZETERMS, ' ')
    .toLowerCase()
    .split(' ')
    .filter((w) => w);
};
/**
 * flatten array
 * @param {Array<any>} array
 * @return {Array<any>}
 */
const flattenArray = (array) => {
  return array.reduce((a, b) => {
    Array.isArray(b) ? a = a.concat(flattenArray(b)) : a.push(b);
    return a;
  }, []);
};
module.exports = {
  normalizeTerms: normalizeTerms,
  flattenArray: flattenArray,
};
