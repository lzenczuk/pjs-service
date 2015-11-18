import ConnectionModel from './connection-model';

export default class ScenarioModel {

    /**
     * @param {Array<NodeModel>} nodes
     * @param {Object} nodesMap
     * @param {Array<Connection>} connections
     */
    constructor(nodes, startNodeId, offsetX, offsetY, scale){
        this.nodes = nodes;

        this.startNodeId = startNodeId;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;

        this.nodesMap = {};
        this.connections = [];
        this.connectionsMap = {};

        this._rebuildNodesMap();
        this._rebuildConnections()
    }

    /**
     * @param {NodeModel} node
     */
    addNode(node){
        this.nodes.push(node);
        this.nodesMap[node.id] = node;
    }

    getNodeById(nodeId){
        return this.nodesMap[nodeId]
    }

    moveNodeTo(nodeId, x, y){
        this.nodesMap[nodeId].x=x;
        this.nodesMap[nodeId].y=y;
        this._rebuildConnections()
    }

    connectNodes(srcNodeId, slotIndex, desNodeId){
        this.nodesMap[srcNodeId].connectToNode(desNodeId, slotIndex);
        this._rebuildConnections()
    }

    getConnectionById(connectionId){
        return this.connectionsMap[connectionId];
    }

    resizeNode(nodeId, width, height, contentHeight){
        this.nodesMap[nodeId].resize(width, height, contentHeight);
        this._rebuildConnections()
    }

    removeConnectionById(connectionId){
        let connection = this.connectionsMap[connectionId];
        this.nodesMap[connection.src].removeConnectionById(connection.index);
        this._rebuildConnections()
    }

    removeNode(nodeId){
        this.nodes = this.nodes.filter(node => node.id!=nodeId);
        this.nodes.forEach(node => node.removeConnectionsToNode(nodeId));
        this._rebuildConnections()
    }

    transformScenario(offsetX, offsetY, scale){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
    }

    _rebuildNodesMap(){
        this.nodesMap = {};
        this.nodes.forEach(node => this.nodesMap[node.id] = node)
    }

    _rebuildConnections(){

        this.connections = [];
        this.connectionsMap = {};

       this.nodes.forEach(nodeModel => {

           nodeModel.getConnectionModels().forEach(connection => {
               var src = this.nodesMap[connection.src];
               var des = this.nodesMap[connection.des];

               var sx = src.x+src.width;
               var sy = src.y+src.contentHeight+10+connection.index*20;

               var dx = des.x;
               var dy = des.y+10;

               connection.srcX = sx;
               connection.srcY = sy;
               connection.desX = dx;
               connection.desY = dy;

               this.connections.push(connection);
               this.connectionsMap[connection.connectionId] = connection
           })
       })
    }


}