import EventEmitter from 'events'

import ActionTypes from '../action/action-types'

export default class ScenarioStore extends EventEmitter {

    constructor(dispatcher){
        super();
        this.dispatcher = dispatcher;

        this._scenarios = {
            loading: false,
            error: false,
            errorMsg: '',
            scenarios: [],
            selectedScenario: null
        };
        
        /*this.dispatcher.register( action => {
            console.log("ScenarioStore action: "+JSON.stringify(action));

            if(action.actionType==ActionTypes.scenarioSelected){
                this._scenarios.selectedScenario = action.scenario;
                this.emit('CHANGE');
            }
        })*/
    }

    get projects(){
        return this._scenarios
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }
}
