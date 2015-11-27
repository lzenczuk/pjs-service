import NodeModel from '../node-model';

export default class ScriptNodeModel extends NodeModel {

    /**
     * @param name
     * @param description
     * @param x
     * @param y
     * @param width
     * @param height
     * @param contentHeight
     * @param script
     * @param {SlotsModel} slots
     * @param executorName
     */
    constructor(id, name, description, x, y, width, height, contentHeight, script, slots, executorName) {
        super(id, name, description, x, y, width, height, contentHeight);

        this.script = script;
        this.slots = slots;
        this.executorName = executorName
    }

    /**
     * @returns {Array<ConnectionModel>}
     */
    getConnectionModels(){

        return this.slots.getConnectionModels().map(connection => {
            connection.src = this.id;

            return connection
        })
    }

    connectToNode(desNodeId, index){
        this.slots.connectToNode(desNodeId, index)
    }

    removeConnectionById(slotIndex){
        this.slots.removeConnectionById(slotIndex)
    }

    removeConnectionsToNode(desNodeId){
        this.slots.removeConnectionsToNode(desNodeId)
    }

    changeSlotLabel(index, newLabel){
        this.slots.changeSlotLabel(index, newLabel)
    }

    getServerModel(){
        let serverNodeModel = super.getServerModel();

        let slots = this.slots.getServerModel();

        serverNodeModel.serverClass = "script_node";
        serverNodeModel.script = this.script;
        serverNodeModel.executorName = this.executorName;
        serverNodeModel.slots = slots;

        return serverNodeModel
    }
}
