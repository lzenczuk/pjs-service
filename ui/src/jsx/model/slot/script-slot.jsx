import SlotModel from '../slot-model';

export default class ScriptSlot extends SlotModel{

    constructor(desNodeId, label, script){
        super(desNodeId, label);

        this.script = script
    }


}
