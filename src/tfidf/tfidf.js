const { Document } = require('./document');

const DOCUMENTTYPE = 'document is not of the Document type';
const EMPTYARRAY = 'terms is not an array';

/**
 *  map's of terms, which contain a map of documents with tf
 *   term       document    tf
 * -----------------------------------
 *   "Hello"    a.txt       2
 *              b.txt       1
 *   "World"    a.txt       1
 */
class Tfidf {

    /**
     * initialize terms and documents as instances of map
     */
    constructor() {
        this._documents = new Map();
        this._terms = new Map();
    }
    /**
     * add a new document and process terms
     * @param {Document} document new document
     * @param {[string]} terms array of terms
     */
    addDocument(document, terms) {
        if (!(document instanceof Document)) {
            throw DOCUMENTTYPE;
        }
        if (!Array.isArray(terms)) {
            throw EMPTYARRAY
        }
        this._createTerms(terms, document);
        this.documents.set(document.name, document);
    }

    /**
     * calcualte more relevant documents of terms
     * @param {[string]} terms 
     * @return {Map<string,number>} return a map de documents sort by tfidf and tfIdf for each doc
     */
    tfIdf(terms) {
        if (!Array.isArray(terms)) {
            throw EMPTYARRAY;
        }

        //process terms
        let documents = this._getTfIdfsDocumentsOfTerm(terms);
        return [...documents.entries()].sort((a, b) => {
           return b[1]-a[1];
        });
    }
    _getTfIdfsDocumentsOfTerm(terms) {
        let countDocument = this.documents.size;

        return terms.reduce((map, term) => {

            let documentsOfTerm = this.terms.get(term);

            if (documentsOfTerm) {
                let countDocumentsOfTerm = documentsOfTerm.size;

                for (let [document, tf] of documentsOfTerm) {
                    let tfIdf = _getTfIdf(tf, countDocument, countDocumentsOfTerm);
                    let tfIdfValue = map.get(document);
                    map.set(document, tfIdfValue ? _computeTfIdf(tfIdf, tfIdfValue) : tfIdf);
                }
            }

            return map;

        }, new Map);
    }

    _createTerms(terms, document) {
        terms.forEach((term) => {
            let tmpTerm = this.terms.get(term);
            if (tmpTerm) {
                this._createDocumentInTerm(tmpTerm, document);
            }
            else {
                this.terms.set(term, this._newTerm(document));
            }
        });
    }
    _newTerm(document) {
        return new Map().set(document.name, 1);
    }
    _createDocumentInTerm(term, document) {
        let tempDocument = term.get(document.name);
        if (tempDocument) {
            term.set(document.name, tempDocument + 1);
        }
        else {
            term.set(document.name, 1);
        }
    }

    /**
     * terms in documents
     * @returns Map<string,Map<string,tf>>
     */
    get terms() {
        return this._terms;
    }
    /**
     * documents
     * @returns Map<string,Document>
     */
    get documents() {
        return this._documents
    }
}


/**
 * sum oldTdfId + newTfIdf
 * @param {number} tfIdf new Tf-Idf
 * @param {number} tfIdfValue  old Td-Idf
 */
function _computeTfIdf(tfIdf, tfIdfValue) {
    //TODO: Solve the sum or the max tfidf when there are several terms in more than one document
    return tfIdf + tfIdfValue;
}
/**
 * calculate tfidf
 * @param {number} tf 
 * @param {number} countDocument 
 * @param {number} countDocumentsOfTerm
 * @returns {number} tfIdf 
 */
function _getTfIdf(tf, countDocument, countDocumentsOfTerm) {
    return tf * Math.log(countDocument / countDocumentsOfTerm);
}


module.exports = {
    Tfidf: Tfidf,
    DOCUMENTTYPE: DOCUMENTTYPE,
    EMPTYARRAY: EMPTYARRAY
}

