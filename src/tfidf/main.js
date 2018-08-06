const questions = require('./questions');
const CHILDPROCESSS = './src/tfidf/child.js';

const main = () => {
    let args = process.argv.slice(2);
    let questionsParams = [undefined, CHILDPROCESSS].concat(args);
    questions.questions.apply(null, questionsParams);
};
main();

module.exports = main;



