const { message, UNSUPPORTEDMESSAGE, watcher } = require('../child');
const { Query } = require('../query');
jest.mock('fs');



describe('child', () => {


    test('query not start', async () => {
        let spy = jest.spyOn(process, 'send')
        let query = new Query('data');
        await ('{key:start}');
        await message({ key: 'query', data: query });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();

    })

    test('query cache', async () => {
        let spy = jest.spyOn(process, 'send')
        let query = new Query('data');
        query.offset = 1
        await message({ key: 'query', data: query });
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();

    })

    test('message not suported', async () => {
        try {
            await message();
        }
        catch (e) {
            expect(e).toEqual(UNSUPPORTEDMESSAGE);
        }

    })
    test('watch send file with event change', async () => {
        let spy = jest.fn();
        await watcher(spy).emit('change', 'a.txt');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    })
    test('watch event is not change', async () => {
        await watcher(() => { }).emit('reset');
    })
    test('watch send folder with event change', async () => {
        let spy = jest.fn();
        await watcher(spy).emit('change', 'folder');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();

    })


})
