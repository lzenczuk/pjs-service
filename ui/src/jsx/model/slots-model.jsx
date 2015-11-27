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

    moveUpSlot(index){
        if(index>0){
            let slot = this.slots[index];

            this.destroySlot(index);
            this.slots.splice(index-1, 0, slot)
        }
    }

    moveDownSlot(index){
        if(index<this.slots.length-1){
            let slot = this.slots[index];

            this.destroySlot(index);
            this.slots.splice(index+1, 0, slot)
        }
    }

    getServerModel(){

        let slots = this.slots.map(slot => slot.getServerModel());

        return {
            slots: slots
        }
    }
}
