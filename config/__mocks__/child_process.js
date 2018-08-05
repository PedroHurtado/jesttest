const child_process = jest.genMockFromModule('child_process');

const fork =()=>{
    let listeners = new Map();
    return {
        on:(message,cb)=>{
            listeners.set(message,cb);
        },
        send:(...args)=>{
            let response = listeners.get('message');
            response(args[0]);
        },
        kill:()=>{
            let response = listeners.get('exit');
            response();
        }
    };
};

child_process.fork = fork;

module.exports = child_process;