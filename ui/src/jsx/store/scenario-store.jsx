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
            }else if(action.actionType==ActionTypes.nodeAdded){

                var node = action.payload.node;
                var name = node.name;

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
            }else if(action.actionType==ActionTypes.connectionAdded){

                var srcNode = this._model.scenario.nodesMap[action.payload.srcNodeName];
                var slot = srcNode.slots.slots[action.payload.slotIndex];

                slot.nodeName = action.payload.desNodeName;

                this._rebuildInternalModel(this._model.scenario);
                this._updateInternalModel(this._model.scenario);

                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.connectionLine){

                this._model.ui.connectionLine = action.payload;
                JSON.stringify(this._model);

                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.cleanUi){

                this._model.ui.connectionLine = null;

                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.transformScenario){
                this._model.ui.offsetX=action.payload.offsetX;
                this._model.ui.offsetY=action.payload.offsetY;
                this._model.ui.scale=action.payload.scale;

                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.nodesResized){
                var changes = action.payload.changes;

                if(changes){
                    changes.forEach((change => {
                        let node = this._model.scenario.nodesMap[change.nodeName];

                        node.width=change.width;
                        node.height=change.height;
                        node.contentHeight=change.contentHeight;
                    }).bind(this))
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
            },
            ui: {
                offsetX: 0,
                offsetY: 0,
                scale: 1,
                selectedNodeName: null
            }
        };
    }

    _loading(){
        this._model.scenario=null;
        this._model.status.loading=true;
        this._model.status.error=false;
        this._model.status.errorMsg='';
        this._model.ui.offsetX=0;
        this._model.ui.offsetY=0;
    }

    _loadingError(message){
        this._model.scenario=null;
        this._model.status.loading=false;
        this._model.status.error=true;
        this._model.status.errorMsg=message;
        this._model.ui.offsetX=0;
        this._model.ui.offsetY=0;
    }

    _loaded(scenario){
        this._model.scenario=scenario;

        this._updateInternalModel(this._model.scenario);

        this._model.status.loading=false;
        this._model.status.error=false;
        this._model.status.errorMsg='';
        this._model.ui.offsetX=0;
        this._model.ui.offsetY=0;
        this._model.ui.selectedNodeName=null
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

    _rebuildInternalModel(model){
        
        model.nodesMap = {};
        model.connections = [];

        model.nodes.forEach(node => {
            var slots = node.slots.slots;

            model.nodesMap[node.name] = node;

            slots.forEach((s, index) => {
                if(s.nodeName!=null){
                    var connection = {src: node.name, des: s.nodeName, srcX: 0, srcY: 0, desX: 0, desY: 0, index: index, total: slots.length};
                    model.connections.push(connection)
                }
            })
        });
    }

    _updateInternalModel(model){

        model.connections.forEach(connection => {
            var src = model.nodesMap[connection.src];
            var des = model.nodesMap[connection.des];

            var sx = src.x+src.width;
            var sy = src.y+src.contentHeight+10+connection.index*20;

            var dx = des.x;
            var dy = des.y+10;

            connection.srcX = sx;
            connection.srcY = sy;
            connection.desX = dx;
            connection.desY = dy;
        });

        return model;
    }
}

