import EventEmitter from 'events';

import ActionTypes from '../action/action-types';

export default class UIStore extends EventEmitter {

    constructor(dispatcher){
        super();
        this.dispatcher = dispatcher;

        this._views={
            PROJECTS: "projects",
            SCENARIO: "scenario"
        };

        this._model = { activeView: null};

        this._dispatchToken = this.dispatcher.register( action => {
        
            if(action.actionType==ActionTypes.initUi){
                this._model.activeView=this._views.PROJECTS;
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.scenarioSelected){
                this._model.activeView=this._views.SCENARIO;
                this.emit('CHANGE');
            }
        })
    }

    get model (){
        return this._model
    }

    get dispatchToken(){
        return this._dispatchToken
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }
}
