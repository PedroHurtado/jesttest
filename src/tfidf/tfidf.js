const {Document} = require('./document');

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
      throw EMPTYARRAY;
    }
    this._createTerms(terms, document);
    this.documents.set(document.name, document);
  }

  /**
     * calcualte more relevant documents of terms
     * @param {[string]} terms
     * @return {Map<string,number>} return a map de documents sort by tfidf
     */
  tfIdfs(terms) {
    if (!Array.isArray(terms)) {
      throw EMPTYARRAY;
    }
    // process terms
    let documents = this._getTfIdfsDocumentsOfTerm(terms);
    return [...documents.entries()].sort((a, b) =>b[1]-a[1]);
  }
  /**
     * terms in documents
     * @return Map<string,Map<string,tf>>
     */
  get terms() {
    return this._terms;
  }
  /**
     * documents
     * @return Map<string,Document>
     */
  get documents() {
    return this._documents;
  }
  _getTfIdfsDocumentsOfTerm(terms) {
    let countDocument = this.documents.size;

    return terms.reduce((map, term) => {
      let documentsOfTerm = this.terms.get(term);

      if (documentsOfTerm) {
        let countDocumentsOfTerm = documentsOfTerm.size;

        for (let [document, tf] of documentsOfTerm) {
          let tfIdf = this._tfidf(tf, countDocument, countDocumentsOfTerm);
          let tfIdfValue = map.get(document);
          let computeTfidf = tfIdfValue ?
            this._computeTfIdf(tfIdf, tfIdfValue) :
            tfIdf;
          map.set(document, computeTfidf);
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
      } else {
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
    } else {
      term.set(document.name, 1);
    }
  }
  _computeTfIdf(tfIdf, tfIdfValue) {
    // TODO: Solve the sum or the max tfidf when there are several terms
    // in more than one document
    return tfIdf + tfIdfValue;
  }
  _tfidf(tf, countDocument, countDocumentsOfTerm) {
    return tf * Math.log(countDocument / countDocumentsOfTerm);
  }
}


module.exports = {
  Tfidf: Tfidf,
  DOCUMENTTYPE: DOCUMENTTYPE,
  EMPTYARRAY: EMPTYARRAY,
};

