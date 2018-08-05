const questions = require('../questions').questions;

jest.mock('readline');
jest.mock('child_process');
questions.__question= jest.fn();

const mocksConsole = (...args) => {
    return args.map((arg)=>{
        return console[arg] = jest.fn(()=>{});
    });
}
const restoreMocks = (mocks) => {
    mocks.forEach((mock) => mock.mockRestore())
}

describe('question', () => {



    test('query command is invoked with 0', () => {
        let mocks = mocksConsole('clear', 'log', 'table');
        questions(undefined);
        mocks.forEach((mock) => {
            expect(mock).toHaveBeenCalled();
        });
        expect(questions.__question).toHaveBeenCalled();
        restoreMocks(mocks);
    })

    test('query command is invoked with terms "hello world" ', () => {
        let mocks = mocksConsole('clear', 'log', 'table');

        questions(undefined, undefined, undefined, 'hello world');

        mocks.forEach((mock) => {
            expect(mock).toHaveBeenCalled();
        });
        expect(questions.__question).toHaveBeenCalled();
        restoreMocks(mocks);
    })

    test('query command "exit"', () => {

        const realProcess = process;
        const exitMock = jest.fn();
        global.process = { ...realProcess, exit: exitMock };
        let mocks = mocksConsole('clear', 'log');

        questions('exit');

        mocks.forEach((mock) => {
            expect(mock).toHaveBeenCalled();
        });
        expect(exitMock).toHaveBeenCalled();
        restoreMocks(mocks);
        global.process = realProcess;
    })

    test('query command "q" or "query"', () => {
        let mocks = mocksConsole('clear', 'log', 'table');

        questions('q');
        questions('query');

        mocks.forEach((mock) => {
            expect(mock).toHaveBeenCalled();
        });
        restoreMocks(mocks);
    })


})
