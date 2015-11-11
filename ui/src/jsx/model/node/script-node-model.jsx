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
    constructor(name, description, x, y, width, height, contentHeight, script, slots, executorName) {
        super(name, description, x, y, width, height, contentHeight);

        this.script = script;
        this.slots = slots;
        this.executorName = executorName
    }

    /**
     * @returns {Array<ConnectionModel>}
     */
    getConnectionModels(){

        return this.slots.getConnectionModels().map(connection => {
            connection.src = this.name;

            return connection
        })
    }

    connectToNode(nodeName, index){
        this.slots.connectToNode(nodeName, index)
    }

    removeConnectionById(slotIndex){
        this.slots.removeConnectionById(slotIndex)
    }

    removeConnectionsToNode(nodeName){
        this.slots.removeConnectionsToNode(nodeName)
    }
}
