const fs = jest.genMockFromModule('fs');

const stat = (file, cb) => {
    let isFolder = { isFile: () => false };
    let isFile = { isFile: () => true };
    if (file === './folder' || file === './docs' || file == './docs/folder') {
        cb(null, isFolder);
    }
    else if (file === 'error' || file === '') {
        cb('error', null)

    } else {
        cb(null, isFile);
    }
};

class Stream {
    constructor() {
        this.map = new Map();
    }
    on(event, cb) {
        if (event == 'data') {
            this.map.set(event, (data) => cb(data));
        } else if (event === 'error') {
            this.map.set(event, () => cb('error'));
        }
        else if (event === 'close') {
            this.map.set(event, () => cb());;
        }
        return this;
    }
    destroy() {
        let result = this.map.get('close');
        result();
    }
}

const createReadStream = (file, options) => {
    let stream = new Stream();

    process.nextTick(() => {
        let data = 'data'
        if (file === './docs/empty') {
            data = ''
        }
        let result = (file === 'OK' || file.substr(0, 1) === '.') ? stream.map.get('data')(data) : stream.map.get('error');
        result && result();

    });
    return stream;
}

const readdir = (path, cb) => {
    if (path === '.' || path === './docs') {
        cb(null, ['a.txt', 'empty', 'a.txt', 'folder']);
    }
    else if (path === './folder' || path === './docs/folder') {
        cb(null, ['b.txt'])
    } else {
        cb('error', null);
    }
};


const watch = (path, options, cb) => {
    let event = {
        emit: async (event, file) => {
            await cb(event, file)
        }
    };
    return event;
}
fs.stat = stat;
fs.createReadStream = createReadStream;
fs.readdir = readdir;
fs.watch = watch;

module.exports = fs;