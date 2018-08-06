const palindrome = require('../palindrome');

describe('palindrome', ()=>{
  test('empty word is not a palindrome', ()=>{
    expect(palindrome('')).toBe(false);
  });

  test('word is not a palindrome', ()=>{
    expect(palindrome('abcdefba')).toBe(false);
  });

  test('word is a palindrome', ()=>{
    expect(palindrome('abccba')).toBe(true);
  });
});
