import Dispatcher from './dispatcher'

let _instance = null;

export default class DndDispatcher extends Dispatcher{

    static instance(){
        if(_instance==null){
            _instance = new DndDispatcher();
        }

        return _instance;
    }

    handleDragAction(action){
        this.dispatch({
            source: "DND_VIEW",
            action: action
        })
    }
}
