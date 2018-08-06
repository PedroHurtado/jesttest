const fs = require('fs');


/**
 * return a prosime wrapping for fs.createReadStream
 * @param {string} file
 */
const readFile = (file)=> {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(file, {encoding: 'utf8'});
    let header;
    stream.on('data', (data) => {
      header = data;
      stream.destroy();
    });
    stream.on('error', (err) => {
      reject(err);
    });
    stream.on('close', () => {
      resolve(header);
    });
  });
};
/**
 * return a prosime wrapping for fs.readdir and read path recursively
 * @param {string} path
 */
const readDir = async (path)=> {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        let allPromises = files.map((file) => `${path}/${file}`).map(async (fileName) => {
          let _isFile = await isFile(fileName);
          return _isFile ? Promise.resolve(fileName) : Promise.resolve(readDir(fileName));
        });
        resolve(Promise.all(allPromises));
      }
    });
  });
};
/**
 * chekc filename is file or folder
 * @param {string} filename
 */
const isFile = async (filename) => {
  return new Promise((resolve, reject) => {
    fs.stat(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.isFile() ? resolve(true) : resolve(false);
      }
    });
  });
};

module.exports = {
  readDir: readDir,
  readFile: readFile,
  isFile: isFile,
};
