import EventEmitter from 'events';
import ActionTypes from '../action/action-types';
import ServerModel from '../model/server-model';
import LoadingStatus from './scenario-store/loading-status';
import ScenarioEditorModel from './scenario-store/scenario-editor-model';


export default class ScenarioStore extends EventEmitter {

    constructor(dispatcher) {
        super();
        this.dispatcher = dispatcher;

        this._reset();

        this.dispatcher.register(action => {

            if (action.actionType == ActionTypes.scenarioLoading) {
                this._loadingStatus.loading();
                this._scenarioModel = null;
                this._scenarioEditorModel.reset();
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.scenarioLoaded) {
                this._loadingStatus.loaded();
                this._scenarioModel = ServerModel.scenarioFromServerModel(action.scenario);
                this._scenarioEditorModel.reset();
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.scenarioLoadingError) {
                this._loadingStatus.loadingError(action.message);
                this._scenarioModel = null;
                this._scenarioEditorModel.reset();
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodeAdded) {
                this._scenarioModel.addNode(action.payload.node);
                this.emit('CHANGE');
            }else if (action.actionType == ActionTypes.nodeRenamed) {
                this._scenarioModel.renameNode(action.payload.nodeId, action.payload.newNodeName);
                this.emit('CHANGE');
            }else if (action.actionType == ActionTypes.nodeScriptChanged) {
                this._scenarioModel.changeNodeScript(action.payload.nodeId, action.payload.newScript);
                this.emit('CHANGE');
            }else if (action.actionType == ActionTypes.nodeDescriptionChanged) {
                this._scenarioModel.changeNodeDescription(action.payload.nodeId, action.payload.newDescription);
                this.emit('CHANGE');
            }else if (action.actionType == ActionTypes.slotLabelChanged) {
                this._scenarioModel.changeSlotLabel(action.payload.nodeId, action.payload.index, action.payload.newLabel);
                this.emit('CHANGE');
            }else if (action.actionType == ActionTypes.slotScriptChanged) {
                this._scenarioModel.changeSlotScript(action.payload.nodeId, action.payload.index, action.payload.newScript);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodeMoved) {
                this._scenarioModel.moveNodeTo(action.payload.nodeId, action.payload.x, action.payload.y);
                this._scenarioEditorModel.updateModels(this._scenarioModel);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.connectionAdded) {
                this._scenarioModel.connectNodes(action.payload.srcNodeId, action.payload.slotIndex, action.payload.desNodeId);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.transformScenario) {
                this._scenarioModel.transformScenario(action.payload.offsetX, action.payload.offsetY, action.payload.scale);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodesResized) {
                action.payload.changes.forEach((change => {
                    this._scenarioModel.resizeNode(change.nodeId, change.width, change.height, change.contentHeight)
                }).bind(this));
                this._scenarioEditorModel.updateModels(this._scenarioModel);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.elementsSelected) {
                var selectedNodeId = {};
                var selectedConnection = '';
                action.payload.elements.forEach(element => {

                    if (element.type == 'NODE') {
                        selectedNodeId[element.id] = true
                    } else if (element.type == 'CONNECTION') {
                        selectedConnection = element.id
                    }
                });

                this._scenarioEditorModel.setSelected(selectedNodeId, selectedConnection);
                this._scenarioEditorModel.updateModels(this._scenarioModel);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.selectedElementsDeleted) {

                if (this._scenarioEditorModel.selectedConnectionId != '') {
                    this._scenarioModel.removeConnectionById(this._scenarioEditorModel.selectedConnectionId);
                }

                Object.keys(this._scenarioEditorModel.selectedNodeIds).forEach(nodeId => this._scenarioModel.removeNode(nodeId));
                this._scenarioEditorModel.reset();
                this.emit('CHANGE');
            }

        })
    }

    _reset() {
        this._scenarioModel = null;
        this._loadingStatus = new LoadingStatus();
        this._scenarioEditorModel = new ScenarioEditorModel();
    }

    get scenarioModel() {
        return this._scenarioModel
    }

    get scenarioEditorModel() {
        return this._scenarioEditorModel
    }

    get loadingStatus(){
        return this._loadingStatus;
    }

    addChangeListener(callback) {
        this.on('CHANGE', callback)
    }

    removeChangeListener(callback) {
        this.removeListener('CHANGE', callback)
    }
}

