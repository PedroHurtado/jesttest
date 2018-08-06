const {Tfidf, DOCUMENTTYPE, EMPTYARRAY} = require('../tfidf');
const {Document} = require('../document');


describe('tfidf class', () => {
  test('constructor', () => {
    let tfidf = new Tfidf();

    expect(tfidf.terms).toBeInstanceOf(Map);
    expect(tfidf.documents).toBeInstanceOf(Map);
  });

  test('check parameter validations addDocuments', () => {
    let tfidf = new Tfidf();
    let nullDocument = () => tfidf.addDocument(null);
    let nullTerms = () => tfidf.addDocument(new Document('a.txt'), null);
    expect(nullDocument).toThrowError(DOCUMENTTYPE);
    expect(nullTerms).toThrowError(EMPTYARRAY);
  });

  test('ckeck addDocuments', () => {
    let tfidf = new Tfidf();

    tfidf.addDocument(new Document('a.txt'), ['Hello', 'World', 'Hello']);
    tfidf.addDocument(new Document('b.txt'), ['Hello', 'new']);

    expect(tfidf.terms.size).toBe(3);

    expect(tfidf.documents.size).toBe(2);
  });

  test('check parameter validations tfIdf', () => {
    let tfidf = new Tfidf();

    expect(() => tfidf.tfIdfs()).toThrowError(EMPTYARRAY);
  });

  test('check tfIdf', () => {
    let tfidf = new Tfidf();

    tfidf.addDocument(new Document('c.txt'), ['json']);

    tfidf.addDocument(new Document('b.txt'), [
      'Hello',
      'World',
      'Hello',
      'Hello',
      'Hello',
    ]);
    tfidf.addDocument(new Document('a.txt'), ['Hello', 'new', 'Hello']);
    tfidf.addDocument(new Document('r.txt'), ['Hello']);
    tfidf.addDocument(new Document('h.txt'), ['World']);

    let tfidfs = tfidf.tfIdfs(['Hello', 'World', 'beer']);
    let receiveValue =['a.txt', 'b.txt', 'h.txt', 'r.txt'];
    expect([...new Map(tfidfs).keys()]
      .sort())
      .toEqual(receiveValue);
  });
});
