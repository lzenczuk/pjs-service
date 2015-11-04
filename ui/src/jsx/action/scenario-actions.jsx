import ActionTypes from './action-types';
import ScenarioModel from '../model/scenario-model'

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
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoaded, scenario: this._convertServerModelToInternalModel(response)})
            }).bind(this),
            ((code, message) => {
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoadingError, message: message})
            }).bind(this))
    }

    addNode(clientX, clientY, node){
        this._dispatcher.dispatch({actionType: ActionTypes.nodeAdded, payload: {clientX: clientX, clientY: clientY, node: node} })
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

    addConnection(srcNodeName, slotIndex, desNodeName){
        this._dispatcher.dispatch({actionType: ActionTypes.connectionAdded, payload: {srcNodeName: srcNodeName, desNodeName: desNodeName, slotIndex: slotIndex} })
    }

    cleanUi(){
        this._dispatcher.dispatch({actionType: ActionTypes.cleanUi, payload: {} })
    }

    _convertServerModelToInternalModel(propsModel){

        console.log("Creatign model");
        let nm = ScenarioModel.fromServerModel(propsModel);
        console.log("New model: "+nm);

        var nodes = [];
        var nameToNodeMap = {};
        var connections = [];

        Object.keys(propsModel.nodesMap).forEach(nodeName => {
            var node = propsModel.nodesMap[nodeName];
            var slots = node.slots.slots;

            nodes.push(node);
            nameToNodeMap[node.name] = node;

            slots.forEach((s, index) => {
                if(s.nodeName!=null){
                    var connection = {src: node.name, des: s.nodeName, srcX: 0, srcY: 0, desX: 0, desY: 0, index: index, total: slots.length};
                    connections.push(connection)
                }
            })
        });

        return {
            nodes: nodes,
            nodesMap: nameToNodeMap,
            connections: connections
        };
    }


}
