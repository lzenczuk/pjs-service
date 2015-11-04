import { Map, List } from 'immutable';
import ScriptSlotModel from './slots/script_slot_model';
import AlwaysTrueSlotModel from './slots/always-true-slot-model';

export default class SlotModel{

   /*
    {
    class: "script_slot",
    nodeName: "lessThen50Node",
    label: "<50",
    script: "function main(input, ctx){ return input < 50}"
    }

    {
    class: "always_true_slot",
    nodeName: "randomNumberNode",
    label: null
    }

     */
    static fromServerModel(smodel){
        var slotModel = Map({nodeName: smodel.nodeName, label: smodel.label})
        var contentModel;

        if("script_slot" == smodel.serverClass){
            contentModel = ScriptSlotModel.newScriptSlotModel(smodel.script)
        }else if("always_true_slot" == smodel.serverClass){
            contentModel = AlwaysTrueSlotModel.newAlwaysTrueSlotModel();
        }else{
            throw "Error: unknown slot model server class: "+smodel.serverClass
        }

        return new SlotModel(slotModel, contentModel)
    }

    constructor(slotModel, contentModel){
        this._model = slotModel;
        this._contentModel = contentModel;
    }

    get targetNodeName(){
        return this._model.get('nodeName')
    }

    toString(){
        return "SlotModel {\nmodel: "+this._model+",\ncontentModel: "+this._contentModel+"\n}\n"
    }
}