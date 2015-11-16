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

    moveNode(nodeName, x, y){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeMoved, payload: {x: x, y: y, nodeName: nodeName} })
    }

    drawConnectLine(sx, sy, dx, dy){
        this._dispatcher.dispatch({actionType: ActionTypes.connectionLine, payload: {sx: sx, sy: sy, dx: dx, dy: dy} })
    }

    transformScenario(offsetX, offsetY, scale){
        this._dispatcher.dispatch({actionType: ActionTypes.transformScenario, payload: {offsetX: offsetX, offsetY: offsetY, scale: scale} })
    }

    resizeNodes(changes){
        this._dispatcher.dispatch({actionType: ActionTypes.nodesResized, payload: {changes: changes} })
    }

    addConnection(srcNodeName, slotIndex, desNodeName){
        this._dispatcher.dispatch({actionType: ActionTypes.connectionAdded, payload: {srcNodeName: srcNodeName, desNodeName: desNodeName, slotIndex: slotIndex} })
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
