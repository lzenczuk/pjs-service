export default class ScenarioEditorModel {

    constructor() {
        this.reset()
    }

    reset() {
        this.selectedNodeName = {};
        this.selectedConnectionId = '';
        this.selectedNodes = [];
        this.selectedConnection = null
    }

    setSelected(selectedNodesNames, connectionId) {
        this.reset();
        this.selectedNodeName = selectedNodesNames;
        this.selectedConnectionId = connectionId;
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

        Object.keys(this.selectedNodeName).map(nodeName => {
            let node = scenarioModel.getNodeByName(nodeName);

            if (node) {
                this.selectedNodes.push(node)
            } else {
                this.selectedNodeName[nodeName] = false
            }
        })
    }
}
