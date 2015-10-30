import React from 'react';

import ScenarioViewport from '../s2/scenario-viewport'
import ScenarioControlPanel from './scenario-control-panel'

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

        this.isMoving = false;
    }

    componentDidMount() {
        this.scenarioStore.addChangeListener(this.scenarioStoreCallback);
    }

    componentWillUnmount(){
        this.scenarioStore.removeChangeListener(this.scenarioStoreCallback)
    }

    render() {

        if(this.state == null || this.state.status == null) return (<div className="max"></div>);

        if(this.state.status.error){
            return (<div className="max">Error: {this.state.status.errorMsg}</div>)
        }

        if(this.state.status.loading){
            return (<div className="max">Loading...</div>)
        }

        var mouseDown = function(event){
            console.log("Event: "+JSON.stringify(event));

            if(event.isMouseDown() && event.isNode()) {
                this.scenarioActions.shiftScenario(this.state.ui.offsetX+25, this.state.ui.offsetY+25)
            }else if(event.isMouseDown() && event.isScenario()){
                this.scenarioActions.shiftScenario(this.state.ui.offsetX-25, this.state.ui.offsetY-25)
            }

        }.bind(this);

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        <div className="max-width top-bar-height no-scrollbars bottom-edge">
                            <div>
                                <ScenarioControlPanel />
                            </div>
                        </div>
                        <ScenarioViewport
                            nodes={this.state.scenario.nodes}
                            connections={this.state.scenario.connections}
                            onMouseEvent={mouseDown}
                            offsetX={this.state.ui.offsetX}
                            offsetY={this.state.ui.offsetY}
                        />
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
