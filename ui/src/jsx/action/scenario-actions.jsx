import ActionTypes from './action-types';

export default class ScenarioActions{

    constructor(dispatcher, server){
        this._dispatcher = dispatcher;
        this._server = server
    }

    selectScenario(scenario){
        this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoading});
        this._dispatcher.dispatch({actionType: ActionTypes.scenarioSelected});

        this._server.GET('/api/scenario',
            (response => {
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoaded, scenario: response})
            }).bind(this),
            ((code, message) => {
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoadingError, message: message})
            }).bind(this))
    }

    saveScenario(scenario){
        let scenarioServerModel = scenario.getServerModel();

        // TODO - bug - not serialize javascript object correctly - sends [object Object] instead of JSON - incorrect interceptor?
        this._server.POST('/api/scenario', JSON.stringify(scenarioServerModel),
            (response => {
                console.log("Saved successful")
            }).bind(this),
            ((code, message) => {
                console.log("Saving error: "+message)
            }).bind(this))
    }

    addNode(node){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeAdded, payload: {node: node} })
    }

    moveNode(nodeId, x, y){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeMoved, payload: {x: x, y: y, nodeId: nodeId} })
    }

    renameNode(nodeId, newNodeName){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeRenamed, payload: {nodeId: nodeId, newNodeName: newNodeName} })
    }

    changeNodeDescription(nodeId, newDescription){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeDescriptionChanged, payload: {nodeId: nodeId, newDescription: newDescription} })
    }

    changeNodeScript(nodeId, newScript){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeScriptChanged, payload: {nodeId: nodeId, newScript: newScript} })
    }

    changeSlotLabel(nodeId, index, newLabel){
        this._dispatcher.dispatch({actionType: ActionTypes.slotLabelChanged, payload: {nodeId: nodeId, index: index, newLabel: newLabel} })
    }

    transformScenario(offsetX, offsetY, scale){
        this._dispatcher.dispatch({actionType: ActionTypes.transformScenario, payload: {offsetX: offsetX, offsetY: offsetY, scale: scale} })
    }

    resizeNodes(changes){
        this._dispatcher.dispatch({actionType: ActionTypes.nodesResized, payload: {changes: changes} })
    }

    addConnection(srcNodeId, slotIndex, desNodeId){
        this._dispatcher.dispatch({actionType: ActionTypes.connectionAdded, payload: {srcNodeId: srcNodeId, desNodeId: desNodeId, slotIndex: slotIndex} })
    }

    cleanUi(){
        this._dispatcher.dispatch({actionType: ActionTypes.cleanUi, payload: {} })
    }

    setActiveUiEvent(event, payload){
        this._dispatcher.dispatch({actionType: ActionTypes.activeUiEventChanged, payload: {event: event, payload: payload} })
    }

    selectElements(elements){
        this._dispatcher.dispatch({actionType: ActionTypes.elementsSelected, payload: {elements: elements} })
    }

    deleteSelectedElements(){
        this._dispatcher.dispatch({actionType: ActionTypes.selectedElementsDeleted, payload: {} })
    }
}
