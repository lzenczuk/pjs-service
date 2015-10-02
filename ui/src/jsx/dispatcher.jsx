export default class Dispatcher{

    constructor(){
        this._callbacks = [];
    }

    register(callback){
        this._callbacks.push(callback);
        return this._callbacks.length-1;
    }

    dispatch(message){

        var resolves = [];
        var rejects = [];

        this._callbacks.map((_, i) => {
            return new Promise((resolve, reject) => {
                resolves[i] = resolve;
                rejects[i] = reject;
            })
        });

        this._callbacks.forEach((callback, i) => {
           Promise.resolve(callback(message)).then(() => {
                resolves[i](message);
            },
               () => {
                   rejects[i](new Error('Dispatcher callback unsuccessful'))
               });
        });
    }
}

