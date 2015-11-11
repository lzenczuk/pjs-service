import NodeModel from './node-model';
import ConnectionModel from './connection-model';

export default class ScenarioModel {

    static fromServerModel(smodel){

        let nodes = [];
        let nodesMap = {};

        Object.keys(smodel.nodesMap)
            .map(sNodeName => smodel.nodesMap[sNodeName])
            .map(sNodeModel => NodeModel.fromServerModel(sNodeModel))
            .forEach(nodeModel => {
                nodes.push(nodeModel);
                nodesMap[nodeModel.name] = nodeModel;
            });

        return new ScenarioModel(nodes, nodesMap, [])

    }

    /**
     * @param {Array<Node>} nodes
     * @param {Object} nodesMap
     * @param {Array<Connection>} connections
     */
    constructor(nodes, nodesMap, connections){
        this.nodes = nodes;
        this.nodesMap = nodesMap;
        this.connections = connections

        this._rebuildConnections();
    }

    // TODO - calculate connections
    _rebuildConnections(){
       this.nodes.forEach(nodeModel => {

       })
    }


}