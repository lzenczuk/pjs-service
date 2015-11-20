import React from 'react';

import ScenarioEditor from '../../scenario-editor/scenario-editor'
import ScenarioControlPanel from './scenario-control-panel'
import SelectedElementsEditor from './selected-elements-editor'

import ScenarioHighLevelEvent from '../../scenario-editor/scenario-high-level-even';

import ctx from '../../../context';

export default
class ScenarioView extends React.Component {

    constructor(props) {
        super(props);

        this.scenarioActions = ctx.scenarioActions;
        this.scenarioStore = ctx.scenarioStore;

        this.scenarioStoreCallback = function () {
            this.setState({
                scenario: this.scenarioStore.scenarioModel,
                editor: this.scenarioStore.scenarioEditorModel,
                loadingStatus: this.scenarioStore.loadingStatus
            });
        }.bind(this);
    }

    componentDidMount() {
        this.scenarioStore.addChangeListener(this.scenarioStoreCallback);
    }

    componentWillUnmount() {
        this.scenarioStore.removeChangeListener(this.scenarioStoreCallback)
    }

    saveScenario() {
        this.scenarioActions.saveScenario(this.state.scenario);
    }

    /**
     * @param {ScenarioLowLevelEvent} event
     * @private
     */
    _onEvent(event) {

        switch (event.eventType) {
            case ScenarioHighLevelEvent.eventsTypes.SCENARIO_TRANSFORM_EVENT:
                this.scenarioActions.transformScenario(event.offsetX, event.offsetY, event.scale);
                break;
            case ScenarioHighLevelEvent.eventsTypes.NODE_DRAG_EVENT:
                this.scenarioActions.moveNode(event.nodeId, event.x, event.y);
                break;
            case ScenarioHighLevelEvent.eventsTypes.CONNECTION_CREATED_EVENT:
                this.scenarioActions.addConnection(event.srcNodeId, event.srcNodeIndex, event.desNodeId);
                break;
            case ScenarioHighLevelEvent.eventsTypes.SELECT_EVENT:
                this.scenarioActions.selectElements(event.selectedElementsArray);
                break;
            case ScenarioHighLevelEvent.eventsTypes.NODES_RESIZE_EVENT:
                this.scenarioActions.resizeNodes(event.nodesSizesArray);
                break;
            case ScenarioHighLevelEvent.eventsTypes.DELETE_SELECTED_EVENT:
                this.scenarioActions.deleteSelectedElements();
                break;

        }
    }

    render() {

        if (this.state == null || this.state.loadingStatus == null) return (<div className="max"></div>);

        if (this.state.loadingStatus.isError()) {
            return (<div className="max">Error: {this.state.status.loadingStatus.errorMessage}</div>)
        }

        if (this.state.loadingStatus.isLoading()) {
            return (<div className="max">Loading...</div>)
        }

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        <div className="max-width top-bar-height no-scrollbars bottom-edge">
                            <div>
                                <ScenarioControlPanel onSaveScenario={this.saveScenario.bind(this)}/>
                            </div>
                        </div>
                        <ScenarioEditor
                            model={this.state.scenario}
                            selectedNodes={this.state.editor.selectedNodeIds}
                            selectedConnection={this.state.editor.selectedConnectionId}
                            onEvent={this._onEvent.bind(this)}
                        />
                    </div>
                </div>

                <div className="scenario-right-panel">
                    <SelectedElementsEditor
                        scenarioModel={this.state.scenario}
                        editorModel={this.state.editor}
                    />
                </div>
            </div>
        )
    }
}
