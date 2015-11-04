import { Map, List } from 'immutable';
import ScriptNodeModel from './nodes/script-node-model';
import SlotModel from './slot-model';

export default class NodeModel{

    /*
     randomNumberNode: {
        class: "script_node",
        x: 250,
        y: 10,
        name: "randomNumberNode",
        description: "Generate random number between 0 and 100.",
        script: "function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}",
        slots: {
            slots: [
                {
                    class: "script_slot",
                    nodeName: "lessThen50Node",
                    label: "<50",
                    script: "function main(input, ctx){ return input < 50}"
                },
                {
                    class: "script_slot",
                    nodeName: "moreThen50Node",
                    label: ">=50",
                    script: "function main(input, ctx){ return input >= 50}"
                }
            ]
        },
        executorName: null
     }
     */
    static fromServerModel(smodel){
        var nodeModel = Map({
            name: smodel.name,
            x: smodel.x,
            y: smodel.y
        });

        var contentModel;
        if("script_node" === smodel.serverClass){
            contentModel = ScriptNodeModel.newScriptNodeModel(smodel.description, smodel.script)
        }else{
            throw "Error: unknown node model server class: "+smodel.serverClass
        }

        var slots = List(smodel.slots.slots.map((slot, index) => SlotModel.fromServerModel(slot)));

        return new NodeModel(nodeModel, contentModel, slots)
    }

    constructor(nodeModel, contentModel, slots){
        this._model = nodeModel;
        this._slots = slots;
        this._contentModel = contentModel;
    }

    get name(){
        return this._model.get('name')
    }

    get x(){
        return this._model.get('x')
    }

    get y(){
        return this._model.get('y')
    }

    get slots(){
        return this._slots
    }

    toString(){
        return  "NodeModel {\n"+this._model+",\nslots: "+this._slots+"\ncontentModel: "+this._contentModel+"\n}\n";
    }
}
