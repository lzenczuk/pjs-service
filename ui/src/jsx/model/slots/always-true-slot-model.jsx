import { Map, List } from 'immutable';

export default class AlwaysTrueSlotModel{

    /*
     {
     class: "always_true_slot",
     nodeName: "randomNumberNode",
     label: null
     }
     */

    static newAlwaysTrueSlotModel(script){
        return new AlwaysTrueSlotModel()
    }

    constructor(){
    }

    toString(){
        return "AlwaysTrueSlotModel {}\n"
    }
}