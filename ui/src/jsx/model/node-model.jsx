export default class NodeModel {

    constructor(id, name, description, x, y, width, height, contentHeight) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.contentHeight = contentHeight
    }

    /**
     * @returns {Array<ConnectionModel>}
     */
    getConnectionModels(){

        return []
    }

    connectToNode(desNodeId, index){
        throw "NodeModel:connectToNode - NodeModel not support slots"
    }

    removeConnectionById(slotIndex){
        throw "NodeModel:removeConnection - NodeModel not support slots"
    }

    removeConnectionsToNode(desNodeId){
        throw "NodeModel:removeConnectionsToNode - NodeModel not support slots"
    }

    resize(width, height, contentHeight){
        this.width = width;
        this.height = height;
        this.contentHeight = contentHeight;
    }

    changeSlotLabel(index, newLabel){
        throw "NodeModel:changeSlotLabel - NodeModel not support slots"
    }

    changeSlotScript(index, newScript){
        throw "NodeModel:changeSlotScript - NodeModel not support slots"
    }

    destroySlot(index){
        throw "NodeModel:destroySlot - NodeModel not support slots"
    }

    addSlot(slot){
        throw "NodeModel:addSlot - NodeModel not support slots"
    }

    moveUpSlot(index){
        throw "NodeModel:moveUpSlot - NodeModel not support slots"
    }

    moveDownSlot(index){
        throw "NodeModel:moveDownSlot - NodeModel not support slots"
    }

    getServerModel(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            contentHeight: this.contentHeight
        }
    }

    getServerClass(){
        throw "NodeModel:getServerClass - NodeModel not support serverClass. Child classes should provide this"
    }
}