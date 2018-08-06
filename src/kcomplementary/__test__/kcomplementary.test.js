const kComplementary = require('../kcomplementary');

describe('kComplementary', ()=>{
  test('k-complementary [1,2,3] sorted array', ()=>{
    let result = kComplementary(3, [1, 2, 3]);
    expect(result).toBe(1);
  });

  test('k-complementary [3,1,2] unsorted array', ()=>{
    let result = kComplementary(3, [3, 1, 2]);
    expect(result).toBe(1);
  });

  test('k-complementary [1,2,4,6,-3,2] duplicates and negatives', ()=>{
    let result = kComplementary(3, [1, 2, 4, 6, -3, 2]);
    expect(result).toBe(3);
  });
});
