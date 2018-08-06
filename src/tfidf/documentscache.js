
const {Tfidf} = require('./tfidf');
const {Document} = require('./document');
const Cache = require('./cache');
const {normalizeTerms} = require('./util');

class DocumentCache {
  constructor(tfidf, cache) {
    this._tfidf = tfidf;
    this._cache = cache;
  }
  addFiles(files) {
    this._cache = new Cache();
    files.forEach((file) => {
      this._addFile(file.file, file.content);
    });
  }
  execQuery(query) {
    let terms = normalizeTerms(query.terms);
    return this._getCahe(terms, query);
  }
  _getCahe(terms, query) {
    // supress duplicate terms
    terms = [...new Set(terms)];

    // sort for cahe "hello world"==="world hello"
    let cacheTerms = terms.sort().join('');


    let documentsCache = this._cache.terms.get(cacheTerms);

    if (!documentsCache) {
      documentsCache = this._tfidf.tfIdfs(terms);
      this._cache.addDocuments(cacheTerms, documentsCache);
    }

    return this._pageResult(query, documentsCache);
  }
  _pageResult(query, documentsCache) {
    let start = (query.page - 1) * query.recordsPerPage;
    let end = query.page * query.recordsPerPage;
    return documentsCache.slice(start, end);
  }
  _addFile(name, content) {
    if (content && !this._tfidf.documents.has(name)) {
      let terms = normalizeTerms(content);
      let document = new Document(name);
      this._tfidf.addDocument(document, terms);
    }
  }
}

const documentsCache = new DocumentCache(new Tfidf(), new Cache());


module.exports = {
  documentsCache: documentsCache,
};
