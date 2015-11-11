import Slot from './slot-model';

export default class SlotsModel{

    static fromServerModel(smodel) {
        let slots = smodel.slots.map(sSlotModel => Slot.fromServerModel(sSlotModel));

        return new SlotsModel(slots);
    }

    constructor(slots){
        this.slots = slots;
    }
}
