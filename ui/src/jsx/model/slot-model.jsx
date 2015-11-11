import ConnectionModel from './connection-model';

export default class SlotModel{

    constructor(nodeName, label){
        this.nodeName = nodeName;
        this.label = label
    }

    /**
     * @returns {ConnectionModel} return model or null when slot is not connected
     */
    getConnectionModel(){
        if(this.nodeName) {
            let connectionModel = new ConnectionModel(null, this.nodeName, 0, 0, 0, 0, null);
            return connectionModel
        }

        return null
    }

    connectToNode(nodeName){
        this.nodeName = nodeName
    }

    removeConnection(){
        this.nodeName = null
    }

    removeConnectionToNode(nodeName){
        if(this.nodeName==nodeName){
            this.nodeName = null
        }
    }
}
