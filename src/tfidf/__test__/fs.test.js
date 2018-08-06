const { isFile, readFile, readDir } = require('../fs');

jest.mock('fs');

describe('fs promises', () => {

  describe('isFile', () => {

    test('Is file', async () => {
      let result = await isFile('file');
      expect(result).toBe(true);
    });

    test('Is folder', async () => {
      let result = await isFile('./folder');
      expect(result).toBe(false);
    });

    test('File not exists', async () => {
      try {
        await isFile('');
      } catch (e) {
        expect(e).toEqual('error');
      }
    });

  });

  describe('readFile', () => {

    test('file exists', async () => {
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

  });

  describe('readDir', () => {

    test('readDir path exists', async () => {
      let content = await readDir('.');
      let checkedDocuments = [
        './a.txt',
        './empty',
        './a.txt',
        ['./folder/b.txt'],
      ];
      expect(content).toEqual(checkedDocuments);
    });

    test('readDir path not exists', async () => {
      try {
        await readDir('');
      } catch (e) {
        expect(e).toEqual('error');
      }
    });

  });

});
