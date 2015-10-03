import DndDispatcher from  '../dispatcher/dnd-dispatcher'

let _instance = null;

export default class DndActions{

    static instance(){
        if(_instance==null){
            _instance = new DndActions();
        }

        return _instance;
    }

    drag(component){
        console.log("DndActions.drag");

        DndDispatcher.instance().handleDragAction({
            actionType: "DRAG",
            component: component
        });
    }
}

