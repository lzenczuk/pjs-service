import NodeDispatcher from './node-dispatcher'

let _instance = null;

export default class NodeStore{

    static instance(){
        if(_instance==null){
            _instance = new NodeStore();
        }

        return _instance;
    }

    constructor(){
        console.log("NodeStore.constructor");

        NodeDispatcher.instance().register((action) => {
            console.log("NodeStore.actionCallback: "+JSON.stringify(action))
        })
    }

    doNothing(){
        console.log("NodeStore.doNothing");
    }
}

