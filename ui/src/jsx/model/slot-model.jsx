import ConnectionModel from './connection-model';

export default class SlotModel{

    constructor(desNodeId, label){
        this.desNodeId = desNodeId;
        this.label = label
    }

    /**
     * @returns {ConnectionModel} return model or null when slot is not connected
     */
    getConnectionModel(){
        if(this.desNodeId) {
            let connectionModel = new ConnectionModel(null, this.desNodeId, 0, 0, 0, 0, null);
            return connectionModel
        }

        return null
    }

    connectToNode(desNodeId){
        this.desNodeId = desNodeId
    }

    removeConnection(){
        this.desNodeId = null
    }

    removeConnectionToNode(desNodeId){
        if(this.desNodeId==desNodeId){
            this.desNodeId = null
        }
    }

    changeSlotLabel(newLabel){
        this.label=newLabel
    }

    changeSlotScript(newScript){
        throw "SlotModel not implement changeSlotScript method, it should be override in child class."
    }

    getServerClass(){
        throw "SlotModel not implement getServerClass method, it should be override in child class."
    }

    getServerModel(){
        return {
            label: this.label,
            desNodeId: this.desNodeId
        }
    }
}
