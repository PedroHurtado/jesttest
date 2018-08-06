const readline = require('readline');
const {fork} = require('child_process');
const {Query} = require('../tfidf/query');


let forked; let query;
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const QUESTIONS = ['Query->', 'Page->', 'Records per page->'];


const showQuery = (msg) => {
  console.clear();
  console.log('\n');
  console.log(msg.query);
  console.log('\n');
  console.table(msg.data);
  console.log('\n');
};

const exit = () => {
  console.clear();
  console.log('\n\x1b[33m%s\x1b[0m', 'Thank you very much\n');
  process.exit(0);
};

const questions = (command /* for test*/, ...args) => {
  let argsForked = [args[1] || []];
  let terms = args[2];
  let recordsPerPage = args[3];

  forked = fork(args[0], argsForked);


  forked.on('message', (msg) => {
    showQuery(msg);
    // repeat query for same terms and request new page
    questions.newQuery();
  });

  forked.on('exit', exit);

  if (terms) {
    query = new Query(terms);
    query.recordsPerPage = recordsPerPage;
    forked.send({key: 'query', data: query});
  } else {
    question(command || 0); // for test
  }
};

const question = (index) => {
  // exclusive by test,test commands "exit" "q", "query"
  let _question = QUESTIONS[index] || index;

  rl.question(_question, (answer) => {
    // answer = answer && answer.toLowerCase().trim();

    // commands
    if (answer === 'exit') {
      forked.kill();
      return;
    } else if (answer === 'q' || answer === 'query') {
      console.clear();
      question(0);
    }
    // query questions
    if (index === 0) {
      query = new Query(answer);
      question(1);
    } else if (index === 1) {
      query.page = answer;
      question(2);
    } else if (index === 2) {
      query.recordsPerPage = answer;
      forked.send({key: 'query', data: query});
    }
  });
};


// for test;
questions.__question = question;
questions.newQuery = ()=>{
  questions.__question(1);
};


module.exports = {
  questions,
};
