const { normalizeTerms, flattenArray } = require('../util');

describe('util', () => {
    test('flattenArray flatten nested array', () => {
        let flatten = flattenArray([1, [2]]);
        expect(flatten).toEqual([1, 2]);
    })
    test('normalize terms tfidf', () => {
        let text = "Hello World";
        let result = normalizeTerms(text);
        expect(result).toEqual(['hello', 'world']);

    })

})