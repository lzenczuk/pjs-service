import SlotModel from '../slot-model';

export default class AlwaysTrueSlot extends SlotModel{

    constructor(desNodeId, label){
        super(desNodeId, label)
    }

    getServerClass(){
        return 'always_true_slot'
    }

    getServerModel(){
        let slotServerModel = super.getServerModel();

        slotServerModel.serverClass = 'always_true_slot';

        return slotServerModel
    }
}