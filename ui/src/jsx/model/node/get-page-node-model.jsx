import NodeModel from '../node-model';

export default class GetPageNodeModel extends NodeModel {

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
    constructor(id, name, description, x, y, width, height, contentHeight, url, slots) {
        super(id, name, description, x, y, width, height, contentHeight);

        this.url = url;
        this.slots = slots;
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

    changeSlotScript(index, newScript){
        this.slots.changeSlotScript(index, newScript)
    }

    destroySlot(index){
        this.slots.destroySlot(index)
    }

    moveUpSlot(index){
        this.slots.moveUpSlot(index)
    }

    moveDownSlot(index){
        this.slots.moveDownSlot(index)
    }

    addSlot(slot){
        this.slots.addSlot(slot)
    }

    getServerModel(){
        let serverNodeModel = super.getServerModel();

        let slots = this.slots.getServerModel();

        serverNodeModel.serverClass = this.getServerClass();
        serverNodeModel.url = this.url;
        serverNodeModel.slots = slots;

        return serverNodeModel
    }

    getServerClass(){
        return "get_page_node"
    }
}
