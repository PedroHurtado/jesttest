const {message, UNSUPPORTEDMESSAGE, watcher} = require('../child');
const {Query} = require('../query');
const {documentsCache} = require('../documentscache');
jest.mock('fs');


describe('child', () => {
  describe('message', () => {
    test('child not start', async () => {
      let spy = jest.spyOn(process, 'send');
      let spyAddFiles = jest.spyOn(documentsCache, 'addFiles');
      let spyExecQuery = jest.spyOn(documentsCache, 'execQuery');
      let query = new Query('data');

      await ('{key:start}');
      await message({key: 'query', data: query});

      expect(spy).toHaveBeenCalled();
      expect(spyAddFiles).toHaveBeenCalled();
      expect(spyExecQuery).toHaveBeenCalled();

      spy.mockRestore();
      spyAddFiles.mockRestore();
      spyExecQuery.mockRestore();
    });

    test('child start', async () => {
      let spy = jest.spyOn(process, 'send');
      let spyExecQuery = jest.spyOn(documentsCache, 'execQuery');
      let query = new Query('data');

      await ('{key:start}');
      await message({key: 'query', data: query});

      expect(spy).toHaveBeenCalled();
      expect(spyExecQuery).toHaveBeenCalled();

      spy.mockRestore();
      spyExecQuery.mockRestore();
    });

    test('message not suported', async () => {
      try {
        await message();
      } catch (e) {
        expect(e).toEqual(UNSUPPORTEDMESSAGE);
      }
    });
  });

  describe('watcher', () => {
    test('send file with event change', async () => {
      let spy = jest.spyOn(documentsCache, 'addFiles');
      await watcher().emit('change', 'a.txt');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });

    test('event is not change', async () => {
      await watcher().emit('reset');
    });

    test('send folder', async () => {
      let spy = jest.spyOn(documentsCache, 'addFiles');
      await watcher().emit('change', 'folder');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
