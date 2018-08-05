
const { Tfidf } = require('./tfidf');
const { Document } = require('./document');
const watch = require('fs').watch;
const { readDir, readFile, isFile } = require('./fs');
const Cache = require('./cache');
const { normalizeText, flattenArray } = require('./util')

const UNSUPPORTEDMESSAGE = 'message is not supported'

let tfidf = new Tfidf();
let cache = null;
let started = false;


const initizalizeCache = ()=> cache = new Cache();
const getFolder = (argv) => argv && argv.slice(2)[0];

const FOLDER = getFolder(process.argv) || './docs';

/**
 * execute the query and send the result to the parent process
 * @param {object} msg 
 */
const execQuery = (msg) => {
    let terms = normalizeText(msg.data.terms);
    let result = getCahe(terms, msg);
    process.send({ key: msg.key, data: result, query: msg.data });
}

/**
 * listener for every message received
 * @param {object} msg {key:'query',data:Query}
 */
const message = async (msg) => {
    if (msg && msg.key === 'query') {
        if (!started) {
            await start();
            started = true;
            execQuery(msg);
        }
        else {
            execQuery(msg);
        }
    }
    else {
        throw UNSUPPORTEDMESSAGE
    }
}

//listen for parent process
process.on('message',message);


/**
 * read files and filescontent
 */
const start = async () => {
    let files = await readDir(FOLDER);
    let filesContent = await readFiles(files);
    processFilesContent(filesContent);
}


/**
 * process text y register documents tfidf
 * @param {string} file 
 * @param {string} contentFile 
 */
const addDocument = (file, contentFile) => {
    if (contentFile && !tfidf.documents.has(file)) {
        let terms = normalizeText(contentFile);
        let document = new Document(file);
        tfidf.addDocument(document, terms);
    }
}

/**
 * cache for processed documents
 * @param {Array<string>} terms 
 * @param {Object} msg 
 */
const getCahe = (terms, msg) => {

     //supress duplicate terms
     terms = [...new Set(terms)];

    //sort for cahe "hello world"==="world hello"
    let cacheTerms = terms.sort().join('');
    
    
    let documentsCache = cache.terms.get(cacheTerms);
   
    if (!documentsCache) {
        documentsCache = tfidf.tfIdf(terms);
        cache.addDocuments(cacheTerms, documentsCache);
    }

    
    return pageResult(msg.data, documentsCache);

    function pageResult(query, documentsCache) {
        let start = (query.page - 1) * query.recordsPerPage;
        let end = query.page * query.recordsPerPage;
        return documentsCache.slice(start, end)

    }

}




/**
 * read content files
 * @param {Array} files 
 */
const readFiles = (files) => {

    initizalizeCache();

    return new Promise((resolve, reject) => {
        let allFiles = flattenArray(files).map(async (file) => {
            let contentFile = await readFile(file);
            return Promise.resolve({ file: file, contentFile: contentFile });
        });
        resolve(Promise.all(allFiles));
    });
}


/**
 * process tfidf documents
 * @param {array} filesContent 
 */
const processFilesContent = (filesContent) => {
    filesContent.forEach((file) => {
        addDocument(file.file, file.contentFile);
    });
}

/**
 * watcher for folder. Written callback for test
 * @param {Function} processFilesContent function 
 */
const watcher = (callback) => {

    return watch(FOLDER, { redursive: true }, async (event, filename) => {
        if (event === 'change' && filename) {
            let file = `${FOLDER}/${filename}`
            let _isFile = await isFile(file);
            if (_isFile) {
                let filesContent = await readFiles([file]);
                callback(filesContent);
            }
            else {
                let files = await readDir(file);
                let filesContent = await readFiles(files);
                callback(filesContent);
            }
        }
    });
    
};
watcher(processFilesContent);




//export for test

module.exports = {
    message: message,
    UNSUPPORTEDMESSAGE: UNSUPPORTEDMESSAGE,
    watcher: watcher
}



