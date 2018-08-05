/**
 * Cache class
 */
class Cache {
    constructor() {
        this.terms = new Map();
    }
    /**
     * 
     * @param {string} terms 
     * @param {array} documents 
     */
    addDocuments(terms, documents) {
        this.terms.set(terms, documents)
    }
}

module.exports = Cache;