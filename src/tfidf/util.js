
const NORMALIZETEXT = /\.|\<|>|[=]|[@]|[+]|[-]|[_]|[%]|[\r\n]|[\n]|[\t]|[/\\\\]|=|\[|]|\{|}|,|;|!|\?|\¿|\(|\)|:|"|'|'$|“|”|‘|’/g;
/**
 * return normalize text for tfidf
 * @param {string} text 
 * @returns {Array<string>} array of string
 */
const normalizeText = (text) => {
    return text.replace(NORMALIZETEXT, ' ').toLowerCase().split(' ').filter(w => w);
}
/**
 * flatten array
 * @param {Array<any>} array 
 */
const flattenArray = (array) => {
    return array.reduce((a, b) => {
        Array.isArray(b) ? a = a.concat(flattenArray(b)) : a.push(b);
        return a;
    }, []);
}
module.exports = {
    normalizeText: normalizeText,
    flattenArray: flattenArray
}