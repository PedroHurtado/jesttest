const questions = require('./src/tfidf/questions');
const CHILDPROCESSS = './src/tfidf/child.js';

let questionsParams = [undefined, CHILDPROCESSS].concat(process.argv.slice(2) || []);
questions.apply(null, questionsParams);




