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
