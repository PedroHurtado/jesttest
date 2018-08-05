const readline = jest.genMockFromModule('readline');


const question = (question, cb) => {
    if (question === 'Query->') {
        cb('Hello World');
    } else if (question === 'Offset->') {
        cb('1')
    }
    else if (question === 'Records per page->') {
        cb('10')
    } else {
        cb(question) //commands 'q','exit' and 'query'
    }

}
const createInterface = () => {
    return { question: question }
};

readline.createInterface = createInterface
module.exports = readline;