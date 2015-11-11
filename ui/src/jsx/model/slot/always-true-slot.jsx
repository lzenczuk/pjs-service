import Slot from '../slot-model';

export default class AlwaysTrueSlot extends Slot{

    static fromServerModel(smodel) {
        return new AlwaysTrueSlot(
            smodel.nodeName,
            smodel.label
        )
    }

    constructor(nodeName, label){
        super(nodeName, label)
    }
}