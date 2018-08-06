const {documentsCache} = require('../documentscache');
const {Query} = require('../query');
describe('documentsCache', ()=>{
  test('addFiles not exits en tfidf', ()=>{
    let query = new Query('world hello');
    documentsCache.addFiles([{file: 'doc', content: 'Hello World'}]);
    let documents = documentsCache.execQuery(query);
    expect(documents.length).toBe(1);
  });

  test('addFiles exits en tfidf', ()=>{
    let query = new Query('world hello');
    documentsCache.addFiles([{file: 'doc', content: 'Hello World'}]);
    let documents = documentsCache.execQuery(query);
    expect(documents.length).toBe(1);
  });
});
