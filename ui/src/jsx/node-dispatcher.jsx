import Dispatcher from './dispatcher'

let _instance = null;

export default class NodeDispatcher extends Dispatcher{

    static instance(){
        if(_instance==null){
            _instance = new NodeDispatcher();
        }

        return _instance;
    }

    handleNodeAction(action){

        console.log("NodeDispatcher.handleNodeAction");

        // do I need this?
        this.dispatch({
            source: "NODE_ACTION",
            action: action
        })
    }
}

console.log("----> module NodeDispatcher");