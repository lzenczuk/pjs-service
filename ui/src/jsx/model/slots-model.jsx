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

    connectToNode(desNodeId, slotIndex){
        this.slots[slotIndex].connectToNode(desNodeId)
    }

    removeConnectionById(slotIndex){
        this.slots[slotIndex].removeConnection()
    }

    removeConnectionsToNode(desNodeId){
        this.slots.forEach(slot => slot.removeConnectionToNode(desNodeId))
    }

    changeSlotLabel(index, newLabel){
        this.slots[index].changeSlotLabel(newLabel)
    }

    changeSlotScript(index, newScript){
        this.slots[index].changeSlotScript(newScript)
    }

    destroySlot(index){
        this.slots = this.slots.filter((slot, slotIndex) => slotIndex!=index)
    }

    addSlot(slot){
        this.slots.push(slot)
    }

    getServerModel(){

        let slots = this.slots.map(slot => slot.getServerModel());

        return {
            slots: slots
        }
    }
}
