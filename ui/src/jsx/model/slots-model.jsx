export default class SlotsModel{

    constructor(slots){
        this.slots = slots;
    }

    /**
     * @returns {Array<ConnectionModel>}
     */
    getConnectionModels(){

        return this.slots.map((slot, index) => {
            let connection = slot.getConnectionModel();

            if(connection) {
                connection.index = index;
                return connection
            }
        }).filter(connection => connection)
    }

    connectToNode(nodeName, slotIndex){
        this.slots[slotIndex].connectToNode(nodeName)
    }

    removeConnectionById(slotIndex){
        this.slots[slotIndex].removeConnection()
    }

    removeConnectionsToNode(nodeName){
        this.slots.forEach(slot => slot.removeConnectionToNode(nodeName))
    }
}
