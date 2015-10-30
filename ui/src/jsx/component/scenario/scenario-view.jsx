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

        this.scenarioMoving = null;
        this.nodeMoving = null;
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

        var mouseMove = function(event){

            if(this.scenarioMoving){
                console.log("Mouse move");

                var changeX = this.scenarioMoving.clientX-event.clientX;
                var changeY = this.scenarioMoving.clientY-event.clientY;

                var newOffsetX = this.scenarioMoving.offsetX-changeX;
                var newOffsetY = this.scenarioMoving.offsetY-changeY;

                this.scenarioActions.shiftScenario(newOffsetX, newOffsetY);
            }else if(this.nodeMoving){
                console.log("Node Mouse move");

                var changeX = this.nodeMoving.clientX-event.clientX;
                var changeY = this.nodeMoving.clientY-event.clientY;

                var newX = this.nodeMoving.nodeX-changeX;
                var newY = this.nodeMoving.nodeY-changeY;
                this.scenarioActions.moveNode(this.nodeMoving.nodeName, newX, newY)
            }
        }.bind(this);

        var mouseDown = function(event){
            console.log("Event: "+JSON.stringify(event));

            if(event.isMouseDown() && event.isScenario()){
                this.scenarioMoving={
                    clientX: event.clientX,
                    clientY: event.clientY,
                    offsetX: this.state.ui.offsetX,
                    offsetY: this.state.ui.offsetY
                }
            }else if(event.isMouseDown() && event.isNode()){
                this.nodeMoving={
                    clientX: event.clientX,
                    clientY: event.clientY,
                    nodeX: this.state.scenario.nodesMap[event.payload.get('nodeName')].x,
                    nodeY: this.state.scenario.nodesMap[event.payload.get('nodeName')].y,
                    nodeName: event.payload.get('nodeName')
                }
            }else if(event.isMouseUp()){
                this.scenarioMoving=null;
                this.nodeMoving=null;
            }
        }.bind(this);

        return (
            <div className="max" onMouseMove={mouseMove}>
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
