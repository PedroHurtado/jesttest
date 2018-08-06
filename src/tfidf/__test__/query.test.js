const {Query, DEFAULTPAGE, DEFAULTRECORSPERPAGE} =require('../query');

describe('Query', ()=>{
  test('offset and recordsPerPage set not interger', ()=>{
    let query = new Query('hello world');
    query.page='';
    query.recordsPerPage='';

    expect(query.page).toBe(DEFAULTPAGE);
    expect(query.recordsPerPage).toBe(DEFAULTRECORSPERPAGE);
  });

  test('getter terms', ()=>{
    let query = new Query('hello world');

    expect(query.terms).toBe('hello world');
  });

  test('getter toJSON', ()=>{
    let query = new Query('hello world');
    let json = query.toJSON();

    expect(json.terms).toBe('hello world');
    expect(json.page).toBe(DEFAULTPAGE);
    expect(json.recordsPerPage).toBe(DEFAULTRECORSPERPAGE);
  });
});
