const questions = require('./questions');
const CHILDPROCESSS = './src/tfidf/child.js';

let args = process.argv.slice(2) || []
let questionsParams = [undefined, CHILDPROCESSS].concat(args);
questions.apply(null, questionsParams);




