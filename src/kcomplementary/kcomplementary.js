/**
 * KComplementary
 * @param {number} k
 * @param {number} a
 * @return {number}
 */
const kComplementary = (k, a)=> {
  let map = new Map();
  let count = 0;
  for (let i = 0; i < a.length; i++) {
    let complValue = k - a[i];
    let tempValue = map.has(complValue) ? map.get(complValue) : 0;
    map.set(complValue, tempValue + 1);
  }
  for (let i =0; i<a.length; i++) {
    let value = a[i];
    count += map.has(value) ? map.get(value) : 0;
  }
  return count/2;
};

module.exports = kComplementary;
