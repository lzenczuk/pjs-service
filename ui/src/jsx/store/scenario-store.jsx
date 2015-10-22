import EventEmitter from 'events'

import ActionTypes from '../action/action-types'

export default class ScenarioStore extends EventEmitter {

    constructor(dispatcher){
        super();
        this.dispatcher = dispatcher;

        this._reset();
        
        this.dispatcher.register( action => {

            if(action.actionType==ActionTypes.scenarioLoading){
                this._loading();
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.scenarioLoaded){
                this._loaded(action.scenario);
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.scenarioLoadingError){
                this._loadingError(action.message);
                this.emit('CHANGE');
            }
        })
    }

    _reset(){
        this._model = {
            scenario: null,
            status: {
                loading: false,
                error: false,
                errorMsg: ''
            }
        };
    }

    _loading(){
        this._model.scenario=null;
        this._model.status.loading=true;
        this._model.status.error=false;
        this._model.status.errorMsg='';
    }

    _loadingError(message){
        this._model.scenario=null;
        this._model.status.loading=false;
        this._model.status.error=true;
        this._model.status.errorMsg=message;
    }

    _loaded(scenario){
        this._model.scenario=scenario;
        this._model.status.loading=false;
        this._model.status.error=false;
        this._model.status.errorMsg='';
    }

    get model(){
        return this._model
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }

    removeChangeListener(callback){
        this.removeListener('CHANGE', callback)
    }
}

