import AlwaysTrueSlot from './slot/always-true-slot';
import ScriptSlot from './slot/script-slot';
import ConnectionModel from './connection-model';

export default class SlotModel{

    static fromServerModel(smodel) {
        switch(smodel.serverClass){
            case 'always_true_slot': return AlwaysTrueSlot.fromServerModel(smodel);
            case 'script_slot': return ScriptSlot.fromServerModel(smodel);
            default: throw "Can't create slot. Unknown serverClass: "+smodel.serverClass
        }
    }

    constructor(nodeName, label){
        this.nodeName = nodeName;
        this.label = label
    }

    // TODO - implement this
    createConnectionModel(){
        //return new ConnectionModel()
    }

}