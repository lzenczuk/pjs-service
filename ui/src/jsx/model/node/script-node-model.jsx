import NodeModel from '../node-model';
import SlotsModel from '../slots-model';

export default class ScriptNodeModel extends NodeModel {

    static fromServerModel(smodel) {

        let slots = SlotsModel.fromServerModel(smodel.slots);

        return new ScriptNodeModel(
            smodel.name,
            smodel.description,
            smodel.x,
            smodel.y,
            smodel.width,
            smodel.height,
            smodel.contentHeight,
            smodel.script,
            slots,
            smodel.executorName
        )
    }

    constructor(name, description, x, y, width, height, contentHeight, script, slots, executorName) {
        super(name, description, x, y, width, height, contentHeight);

        this.script = script;
        this.slots = slots;
        this.executorName = executorName
    }
}
