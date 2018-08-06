

const watch = require('fs').watch;
const {readDir, readFile, isFile} = require('./fs');
const {documentsCache} = require('./documentscache');
const {flattenArray} = require('./util');


const UNSUPPORTEDMESSAGE = 'message is not supported';

let started = false;

const getFolder = (argv) => argv.slice(2)[0];

const FOLDER = getFolder(process.argv) || './docs';

/**
 * execute the query and send the result to the parent process
 * @param {object} msg
 */
const sendMessage = (msg) => {
  let documents = documentsCache.execQuery(msg.data);
  process.send({key: msg.key, data: documents, query: msg.data});
};

/**
 * listener for every message received
 * @param {object} msg {key:'query',data:Query}
 */
const message = async (msg) => {
  if (msg && msg.key === 'query') {
    if (!started) {
      await start();
      started = true;
      sendMessage(msg);
    } else {
      sendMessage(msg);
    }
  } else {
    throw UNSUPPORTEDMESSAGE;
  }
};

// listen for parent process
process.on('message', message);


/**
 * read files and filescontent
 */
const start = async () => {
  let files = await readDir(FOLDER);
  let filesContent = await readFiles(files);
  documentsCache.addFiles(filesContent);
};


/**
 * read content files
 * @param {Array} files
 * @return {Promise}
 */
const readFiles = (files) => {
  return new Promise((resolve, reject) => {
    let allFiles = flattenArray(files).map(async (file) => {
      let contentFile = await readFile(file);
      return Promise.resolve({file: file, content: contentFile});
    });
    resolve(Promise.all(allFiles));
  });
};

/**
 * watcher for folder. Written callback for test
 * @param {Function} processFilesContent function
 * @return {FsWatcher}
 */
const watcher = () => {
  return watch(FOLDER, {redursive: true}, async (event, filename) => {
    if (event === 'change' && filename) {
      let file = `${FOLDER}/${filename}`;
      let _isFile = await isFile(file);
      if (_isFile) {
        let filesContent = await readFiles([file]);
        documentsCache.addFiles(filesContent);
      } else {
        let files = await readDir(file);
        let filesContent = await readFiles(files);
        documentsCache.addFiles(filesContent);
      }
    }
  });
};

watcher();


// export for test

module.exports = {
  message: message,
  UNSUPPORTEDMESSAGE: UNSUPPORTEDMESSAGE,
  watcher: watcher,
};


