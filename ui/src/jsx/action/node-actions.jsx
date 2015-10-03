import NodeDispatcher from  '../dispatcher/node-dispatcher'

let _instance = null;

export default class NodeActions{

    static instance(){
        if(_instance==null){
            _instance = new NodeActions();
        }

        return _instance;
    }

    createNode(){
        console.log("NodeActions.createNode");

        NodeDispatcher.instance().handleNodeAction({
            actionType: 'CREATE_NODE'
        });
    }

    moveNode(nodeName, x, y){

    }
}

