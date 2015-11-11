export default class NodeModel {

    constructor(name, description, x, y, width, height, contentHeight) {
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

    connectToNode(nodeName, index){
        throw "NodeModel:connectToNode - NodeModel not support slots"
    }

    removeConnectionById(slotIndex){
        throw "NodeModel:removeConnection - NodeModel not support slots"
    }

    removeConnectionsToNode(nodeName){
        throw "NodeModel:removeConnectionsToNode - NodeModel not support slots"
    }

    resize(width, height, contentHeight){
        this.width = width;
        this.height = height;
        this.contentHeight = contentHeight;

    }
}