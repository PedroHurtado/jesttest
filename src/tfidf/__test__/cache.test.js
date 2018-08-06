const Cache = require('../cache');

describe('Cache', ()=>{
  test('cache constructor', ()=>{
    let cache = new Cache();
    expect(cache.terms).toBeInstanceOf(Map);
  });
  test('cache method addDocument', ()=>{
    let cache = new Cache();
    cache.addDocuments(1, 1);
    expect(cache.terms.get(1)).toBe(1);
  });
});
