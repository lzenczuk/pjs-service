import Slot from '../slot-model';

export default class ScriptSlot extends Slot{

    static fromServerModel(smodel) {
        return new ScriptSlot(
            smodel.nodeName,
            smodel.label,
            smodel.script
        )
    }

    constructor(nodeName, label, script){
        super(nodeName, label);

        this.script = script
    }
}
