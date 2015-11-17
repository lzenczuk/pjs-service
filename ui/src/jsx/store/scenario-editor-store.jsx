import EventEmitter from 'events';
import ActionTypes from '../action/action-types';

export default class ScenarioEditorStore extends EventEmitter {

    constructor(dispatcher, scenarioStore) {
        super();

        this.scenarioStore = scenarioStore;

        this.scenarioStore.addChangeListener(this._updateModels.bind(this));

        this.dispatcher = dispatcher;

        this._reset();

        this.dispatcher.register(action => {

            if (action.actionType == ActionTypes.elementsSelected) {
                this._model.selectedNodeName = {};
                this._model.selectedConnection = '';

                action.payload.elements.forEach(element => {

                    if (element.type == 'NODE') {
                        this._model.selectedNodeName[element.name] = true
                    } else if (element.type == 'CONNECTION') {
                        this._model.selectedConnection = element.name
                    }
                });

                this._updateModels();

                this.emit('CHANGE');
            }

            /*else if (action.actionType == ActionTypes.selectedElementsDeleted) {

                if (this._model.ui.selectedConnection != '') {
                    var connectionId = this._model.ui.selectedConnection;
                    this._model.scenario.removeConnectionById(connectionId);
                }

                Object.keys(this._model.ui.selectedNodeName).forEach(nodeName => this._model.scenario.removeNode(nodeName));
                this.emit('CHANGE');
            }*/

        })
    }

    _reset() {
        this._model = {
            selectedNodeName: {},
            selectedConnectionId: '',
            selectedNodes: [],
            selectedConnection: null
        };
    }

    _updateModels(){
        let scenarioModel = this.scenarioStore.model;

        this._model.selectedConnection = null;
        this._model.selectedNode = [];

        if(''!=this._model.selectedConnectionId){
            let connection = scenarioModel.getConnectionById(this._model.selectedConnectionId)
            if(connection){
                this._model.selectedConnection = connection
            }else{
                this._model.selectedConnectionId=''
            }
        }

        Object.keys(this._model.selectedNodeName).map(nodeName => {
            let node = scenarioModel.getNodeByName(nodeName);

            if(node){
                this._model.selectedNodes.push(node)
            }else{
                this._model.selectedNodeName[nodeName] = false
            }
        })
    }


    get model() {
        return this._model
    }

    addChangeListener(callback) {
        this.on('CHANGE', callback)
    }

    removeChangeListener(callback) {
        this.removeListener('CHANGE', callback)
    }
}