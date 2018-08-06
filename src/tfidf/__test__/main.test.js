const main = require('../main');
const questions = require('../questions');

describe('main', ()=>{
  test('invoke main', ()=>{
    let spy = jest.spyOn(questions, 'questions');
    main();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
