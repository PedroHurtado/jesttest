const {isFile, readFile, readDir} = require('../fs');

jest.mock('fs');

describe('fs promises', () => {
  test('isFile is file', async () => {
    let result = await isFile('file');
    expect(result).toBe(true);
  });
  test('isFile is folder', async () => {
    let result = await isFile('./folder');
    expect(result).toBe(false);
  });
  test('isFile file not exists', async () => {
    try {
      await isFile('');
    } catch (e) {
      expect(e).toEqual('error');
    }
  });

  test('readFile file exists', async () => {
    let content = await readFile('OK');
    expect(content).toEqual('data');
  });

  test('readFile file not exists', async () => {
    try {
      await readFile('');
    } catch (e) {
      expect(e).toEqual('error');
    }
  });
  test('readDir path exists', async () => {
    let content = await readDir('.');
    expect(content).toEqual(['./a.txt', './empty', './a.txt', ['./folder/b.txt']]);
  });
  test('readDir path not exists', async () => {
    try {
      await readDir('');
    } catch (e) {
      expect(e).toEqual('error');
    }
  });
});
