import { Map, List } from 'immutable';

export default class ScriptSlotModel{

    /*
     {
     class: "script_slot",
     nodeName: "lessThen50Node",
     label: "<50",
     script: "function main(input, ctx){ return input < 50}"
     }
     */

    static newScriptSlotModel(script){
        return new ScriptSlotModel(Map({script: script}))
    }

    constructor(model){
        this._model=model
    }

    toString(){
        return "ScriptSlotModel {\nmodel: "+this._model+"\n}\n"
    }
}
