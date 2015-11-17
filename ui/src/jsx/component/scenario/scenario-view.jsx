import React from 'react';

import ScenarioEd from '../s2/scenario-ed'
import ScenarioControlPanel from './scenario-control-panel'

import ScenarioHighLevelEvent from '../s2/scenario-high-level-even';

import ctx from '../../context';

export default
class ScenarioView extends React.Component {

    constructor(props) {
        super(props);

        this.scenarioActions = ctx.scenarioActions;
        this.scenarioStore = ctx.scenarioStore;

        this.scenarioStoreCallback = function(){
            this.setState(this.scenarioStore.model);
        }.bind(this);
    }

    componentDidMount() {
        this.scenarioStore.addChangeListener(this.scenarioStoreCallback);
    }

    componentWillUnmount(){
        this.scenarioStore.removeChangeListener(this.scenarioStoreCallback)
    }

    /**
     * @param {ScenarioEvent} event
     * @private
     */
    _onEvent(event){

        switch(event.eventType){
            case ScenarioHighLevelEvent.eventsTypes.SCENARIO_TRANSFORM_EVENT:
                this.scenarioActions.transformScenario(event.offsetX, event.offsetY, event.scale);
                break;
            case ScenarioHighLevelEvent.eventsTypes.NODE_DRAG_EVENT:
                this.scenarioActions.moveNode(event.nodeName, event.x, event.y);
                break;
            case ScenarioHighLevelEvent.eventsTypes.CONNECTION_CREATED_EVENT:
                this.scenarioActions.addConnection(event.srcNodeName, event.srcNodeIndex, event.desNodeName);
                break;
            case ScenarioHighLevelEvent.eventsTypes.SELECT_EVENT:
                this.scenarioActions.selectElements(event.selectedElementsArray);
                break;
            case ScenarioHighLevelEvent.eventsTypes.NODES_RESIZE_EVENT:
                this.scenarioActions.resizeNodes(event.nodesSizesArray);
                break;
            case ScenarioHighLevelEvent.eventsTypes.DELETE_SELECTED_EVENT:
                this.scenarioActions.deleteSelectedElements()
                break;

        }
    }

    render() {

        if(this.state == null || this.state.status == null) return (<div className="max"></div>);

        if(this.state.status.error){
            return (<div className="max">Error: {this.state.status.errorMsg}</div>)
        }

        if(this.state.status.loading){
            return (<div className="max">Loading...</div>)
        }

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        <div className="max-width top-bar-height no-scrollbars bottom-edge">
                            <div>
                                <ScenarioControlPanel />
                            </div>
                        </div>
                        <div>
                            <ScenarioEd
                                model={this.state.scenario}
                                selectedNodes={this.state.ui.selectedNodeName}
                                selectedConnection={this.state.ui.selectedConnection}
                                onEvent={this._onEvent.bind(this)}
                            />
                        </div>
                    </div>
                </div>

                <div className="scenario-right-panel">
                    <div>
                        Right scenario
                    </div>
                </div>
            </div>
        )
    }
}
