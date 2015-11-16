import EventEmitter from 'events';
import ActionTypes from '../action/action-types';
import ServerModel from '../model/server-model';


export default class ScenarioStore extends EventEmitter {

    constructor(dispatcher) {
        super();
        this.dispatcher = dispatcher;

        this._reset();

        this.dispatcher.register(action => {

            if (action.actionType == ActionTypes.scenarioLoading) {
                this._loading();
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.scenarioLoaded) {
                this._loaded(action.scenario);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.scenarioLoadingError) {
                this._loadingError(action.message);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodeAdded) {
                this._model.scenario.addNode(action.payload.node);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodeMoved) {
                this._model.scenario.moveNodeTo(action.payload.nodeName, action.payload.x, action.payload.y);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.connectionAdded) {
                this._model.scenario.connectNodes(action.payload.srcNodeName, action.payload.slotIndex, action.payload.desNodeName);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.connectionLine) {
                this._model.ui.connectionLine = action.payload;
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.cleanUi) {
                this._model.ui.connectionLine = null;
                this._model.ui.state.activeEvent = null;
                this._model.ui.state.payload = null;
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.transformScenario) {
                this._model.scenario.transformScenario(action.payload.offsetX, action.payload.offsetY, action.payload.scale);
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.nodesResized) {
                action.payload.changes.forEach((change => {
                    this._model.scenario.resizeNode(change.nodeName, change.width, change.height, change.contentHeight)
                }).bind(this));
                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.activeUiEventChanged) {
                this._model.ui.state.activeEvent = action.payload.event;
                this._model.ui.state.payload = action.payload.payload;

                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.elementsSelected) {
                this._model.ui.selectedNodeName = {};
                this._model.ui.selectedConnection = '';
                action.payload.elements.forEach(element => {

                    if (element.type == 'NODE') {
                        this._model.ui.selectedNodeName[element.name] = true
                    } else if (element.type == 'CONNECTION') {
                        this._model.ui.selectedConnection = element.name
                    }
                });

                this.emit('CHANGE');
            } else if (action.actionType == ActionTypes.selectedElementsDeleted) {

                if (this._model.ui.selectedConnection != '') {
                    var connectionId = this._model.ui.selectedConnection;
                    this._model.scenario.removeConnectionById(connectionId);
                }

                Object.keys(this._model.ui.selectedNodeName).forEach(nodeName => this._model.scenario.removeNode(nodeName));
                this.emit('CHANGE');
            }

        })
    }

    _reset() {
        this._model = {
            scenario: null,
            status: {
                loading: false,
                error: false,
                errorMsg: ''
            },
            ui: {
                selectedNodeName: {},
                selectedConnection: '',
                state: {
                    activeEvent: null,
                    payload: null
                }
            }
        };
    }

    _loading() {
        this._model.scenario = null;
        this._model.status.loading = true;
        this._model.status.error = false;
        this._model.status.errorMsg = '';
    }

    _loadingError(message) {
        this._model.scenario = null;
        this._model.status.loading = false;
        this._model.status.error = true;
        this._model.status.errorMsg = message;
    }

    _loaded(scenario) {

        this._model.scenario = ServerModel.scenarioFromServerModel(scenario);

        this._model.status.loading = false;
        this._model.status.error = false;
        this._model.status.errorMsg = '';
        this._model.ui.selectedNodeName = {};
        this._model.ui.selectedConnection = '';
        this._model.ui.activeEvent = {
            activeEvent: null,
            payload: null
        }
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

