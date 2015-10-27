import EventEmitter from 'events'

import ActionTypes from '../action/action-types'

const _slotWidth = 70;
const _nodeHeight = 75;

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
            }else if(action.actionType==ActionTypes.nodeAdded){

                var name = action.payload.node.name;

                var node = {
                    "class" : "script_node",
                    "x" : action.payload.clientX,
                    "y" : action.payload.clientY,
                    "name" : name,
                    "description" : "New node",
                    "script" : "function main(input, ctx){}",
                    "slots" : {
                        "slots" : [ ]
                    },
                    "executorName" : null
                    };

                if(this._model.scenario!=null){
                    this._model.scenario.nodesMap[name]=node;
                    this._model.scenario.nodes.push(node)
                }

                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.nodeMoved){

                var name = action.payload.nodeName;
                var x = action.payload.x;
                var y = action.payload.y;

                if(this._model.scenario!=null){
                    this._model.scenario.nodesMap[name].x=x;
                    this._model.scenario.nodesMap[name].y=y;
                }

                this._updateInternalModel(this._model.scenario);

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

        this._updateInternalModel(this._model.scenario);

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

    _updateInternalModel(model){

        model.nodes.forEach(node => {
            var slots = node.slots.slots;

            if(slots.length<=3){
                node.uiWidth=_slotWidth*3;
            }else{
                node.uiWidth=_slotWidth*slots.length;
            }
        });

        model.connections.forEach(connection => {
            var src = model.nodesMap[connection.src];
            var des = model.nodesMap[connection.des];

            var sx = src.x+connection.index*_slotWidth+(_slotWidth/2);

            if(connection.total==1){
                sx = (src.x+src.uiWidth/2)
            }else if(connection.total==2){
                sx = src.x+connection.index*(src.uiWidth/2)+((src.uiWidth/2)/2);
            }

            var sy = src.y+_nodeHeight;

            var dx = (des.x+des.uiWidth/2);
            var dy = des.y;

            connection.srcX = sx;
            connection.srcY = sy;
            connection.desX = dx;
            connection.desY = dy;
        });

        return model;
    }
}

