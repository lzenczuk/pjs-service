export default class ScenarioEditorModel {

    constructor() {
        this.reset()
    }

    reset() {
        this.selectedNodeIds = {};
        this.selectedConnectionId = '';
        this.selectedNodes = [];
        this.selectedConnection = null
    }

    setSelected(selectedNodesIds, connectionId) {
        this.reset();
        this.selectedNodeIds = selectedNodesIds;
        this.selectedConnectionId = connectionId;
    }

    numberOfSelectedElements(){
        var selected = 0;

        if(this.selectedConnectionId!='') selected=1;
        selected += this.selectedNodes.length;

        return selected
    }

    isConnectionSelected(){
        return this.numberOfSelectedElements()==1 && this.selectedConnectionId!=''
    }

    isSingleNodeSelected(){
        return this.numberOfSelectedElements()==1 && this.selectedNodes.length==1
    }

    getSelectedNode(index){
        return this.selectedNodes[index]
    }

    getSelectedConnection(){
        return this.selectedConnection
    }

    /**
     *
     * @param {ScenarioModel} scenarioModel
     */
    updateModels(scenarioModel) {
        this.selectedConnection = null;
        this.selectedNodes = [];

        if ('' != this.selectedConnectionId) {
            let connection = scenarioModel.getConnectionById(this.selectedConnectionId);
            if (connection) {
                this.selectedConnection = connection
            } else {
                this.selectedConnectionId = ''
            }
        }

        Object.keys(this.selectedNodeIds).map(nodeId => {
            let node = scenarioModel.getNodeById(nodeId);

            if (node) {
                this.selectedNodes.push(node)
            } else {
                this.selectedNodeIds[nodeId] = false
            }
        })
    }
}
