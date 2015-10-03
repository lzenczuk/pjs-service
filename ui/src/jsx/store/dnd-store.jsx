import EventEmitter from 'events'
import DndDispatcher from '../dispatcher/dnd-dispatcher'

let _instance = null;

export default class DndStore extends EventEmitter{

    static instance(){
        if(_instance==null){
            _instance = new DndStore();
        }

        return _instance;
    }

    constructor(){
        super();

        this.dndComponent = {};

        DndDispatcher.instance().register((action) => {

                console.log("DnaStore.actionCallback: " + JSON.stringify(action));

                if(action.action.actionType==='DRAG'){
                    this.dndComponent=action.action.component;
                    this.emit('DRAG_BEGIN')
                }
            }
        )
    }

    getDndComponent(){
        console.log("DndStore get: "+JSON.stringify(this.dndComponent));
        return this.dndComponent;
    }

    addDndBegineListener(callback){
        this.on('DRAG_BEGIN', callback)
    }
}

