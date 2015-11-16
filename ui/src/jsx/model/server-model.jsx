import ScenarioModel from './scenario-model';
import NodeModel from './node-model';
import ScriptNodeModel from './node/script-node-model';
import SlotsModel from './slots-model';
import SlotModel from './slot-model';
import AlwaysTrueSlot from './slot/always-true-slot';
import ScriptSlot from './slot/script-slot';

export default class ServerModel {

    static scenarioFromServerModel(smodel){

        console.log("==========> smodel")

        let nodes = [];
        let nodesMap = {};

        Object.keys(smodel.nodesMap)
            .map(sNodeName => smodel.nodesMap[sNodeName])
            .map(sNodeModel => ServerModel.nodeFromServerModel(sNodeModel))
            .forEach(nodeModel => {
                nodes.push(nodeModel);
                nodesMap[nodeModel.name] = nodeModel;
            });

        return new ScenarioModel(nodes, smodel.offsetX, smodel.offsetY, smodel.scale)

    }

    static nodeFromServerModel(smodel) {
        switch(smodel.serverClass){
            case 'script_node': return ServerModel.scriptNodeModelFromServerModel(smodel);
            default: throw "Can't create node. Unknown serverClass: "+smodel.serverClass
        }
    }

    static scriptNodeModelFromServerModel(smodel) {

        let slots = ServerModel.slotsModelFromServerModel(smodel.slots);

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

    static slotsModelFromServerModel(smodel) {

        let slots = smodel.slots.map(sSlotModel => ServerModel.slotModelFromServerModel(sSlotModel));

        return new SlotsModel(slots);
    }

    static slotModelFromServerModel(smodel) {
        switch(smodel.serverClass){
            case 'always_true_slot': return ServerModel.alwaysTrueSlotFromServerModel(smodel);
            case 'script_slot': return ServerModel.scriptSlotFromServerModel(smodel);
            default: throw "Can't create slot. Unknown serverClass: "+smodel.serverClass
        }
    }

    static alwaysTrueSlotFromServerModel(smodel) {
        return new AlwaysTrueSlot(
            smodel.nodeName,
            smodel.label
        )
    }

    static scriptSlotFromServerModel(smodel) {
        return new ScriptSlot(
            smodel.nodeName,
            smodel.label,
            smodel.script
        )
    }
}