import { Map, List } from 'immutable';
import NodeModel from './node-model';
import ConnectionModel from './connection-model';

export default class ScenarioModel {

    static newScenarioModel(){
        return new ScenarioModel(Map({name: '', offsetX: 0, offsetY: 0, scale: 1}), List(), List())
    }

    static fromServerModel(smodel){

        var model = Map({name: '', offsetX: 0, offsetY: 0, scale: 1})

        let nodes = List(Object.keys(smodel.nodesMap).map(nodeName => smodel.nodesMap[nodeName]).map(node => NodeModel.fromServerModel(node)));
        /*let connectionss = nodes.map(node => {
                return {srcNode: node, slots: node.slots}
            })
            .map(con => {
                return {srcNode: con.srcNode, slots: con.slots.filter(slot => slot.targetNodeName!=null)}
            })
            .filter(con => {
                return con.slots.size>0
            })
            .map(con => {
                con.slots.map(slot => ConnectionModel.newConnectionModel(con.srcNode.name, slot.targetNodeName, con.srcNode.x, con.srcNode.y, 0, 0))
            });*/
        console.log("------> ");

        let nc = nodes.map(node => {
            return {srcNode: node, slots: node.slots}
        });
        let ncs = nc
            .map(con => {
                return {srcNode: con.srcNode, slots: con.slots.filter(slot => slot.targetNodeName!=null)}
            });
        let fncs = ncs
            .filter(con => {
                return con.slots.size>0
            });
        let connectionss = fncs
            .map(con => {
                return con.slots.map(slot => ConnectionModel.newConnectionModel(con.srcNode.name, slot.targetNodeName, con.srcNode.x, con.srcNode.y, 0, 0))
            });

        let res = connectionss.reduce((rl, l) => {
            console.log("merge l: "+l+"; rl: "+rl);
            return l.merge(rl)
        }, List());

        console.log("------> "+res);

        let connections = List();

        return new ScenarioModel(model, nodes, connections)
    }

    constructor(scenarioModel, nodes, connections){
        this._model = scenarioModel;
        this._nodes = nodes;
        this._connections = connections
    }

    toString(){
        return "ScenarioModel {\nmodel: "+this._model+",\nnodes: "+this._nodes+",\nconnections: "+this._connections+"\n}\n";
    }
}