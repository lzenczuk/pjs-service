import SlotModel from '../slot-model';

export default class ScriptSlot extends SlotModel{

    constructor(nodeName, label, script){
        super(nodeName, label);

        this.script = script
    }


}
