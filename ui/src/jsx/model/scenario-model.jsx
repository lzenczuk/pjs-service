import ConnectionModel from './connection-model';

export default class ScenarioModel {

    /**
     * @param {Array<NodeModel>} nodes
     * @param {Object} nodesMap
     * @param {Array<Connection>} connections
     */
    constructor(nodes, offsetX, offsetY, scale){
        this.nodes = nodes;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;

        this.nodesMap = {};
        this.connections = [];
        this.connectionsMap = {};

        this._rebuildNodesMap();
        this._rebuildConnections()

        console.log("========> new scenario: "+JSON.stringify(this))
    }

    /**
     * @param {NodeModel} node
     */
    addNode(node){
        this.nodes.push(node);
        this.nodesMap[node.name] = node;
    }

    moveNodeTo(name, x, y){
        this.nodesMap[name].x=x;
        this.nodesMap[name].y=y;
        this._rebuildConnections()
    }

    connectNodes(srcNodeName, slotIndex, desNodeName){
        this.nodesMap[srcNodeName].connectToNode(desNodeName, slotIndex);
        this._rebuildConnections()
    }

    resizeNode(nodeName, width, height, contentHeight){
        this.nodesMap[nodeName].resize(width, height, contentHeight);
        this._rebuildConnections()
    }

    removeConnectionById(connectionId){
        let connection = this.connectionsMap[connectionId];
        this.nodesMap[connection.src].removeConnectionById(connection.index);
        this._rebuildConnections()
    }

    removeNode(nodeName){
        this.nodes = this.nodes.filter(node => node.name!=nodeName);
        this.nodes.forEach(node => node.removeConnectionsToNode(nodeName));
        this._rebuildConnections()
    }

    transformScenario(offsetX, offsetY, scale){
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.scale = scale;
    }

    _rebuildNodesMap(){
        this.nodesMap = {};
        this.nodes.forEach(node => this.nodesMap[node.name] = node)
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