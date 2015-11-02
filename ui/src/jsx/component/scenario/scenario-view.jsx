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

        var mouseDown = function(event){

            if(event.isMouseDown() && event.isScenario()){
                this.scenarioMoving={
                    clientX: event.clientX,
                    clientY: event.clientY,
                    offsetX: event.offsetX,
                    offsetY: event.offsetY
                }
            }else if(event.isMouseDown() && event.isNode()){
                this.nodeMoving={
                    x: event.x,
                    y: event.y,
                    nodeX: this.state.scenario.nodesMap[event.payload.get('nodeName')].x,
                    nodeY: this.state.scenario.nodesMap[event.payload.get('nodeName')].y,
                    nodeName: event.payload.get('nodeName')
                }
            }else if(event.isMouseUp()){
                this.scenarioMoving=null;
                this.nodeMoving=null;
            }else if(event.isMouseMove()){
                if(this.scenarioMoving){

                    var changeX2 = this.scenarioMoving.clientX-event.clientX;
                    var changeY2 = this.scenarioMoving.clientY-event.clientY;

                    var newOffsetX = this.scenarioMoving.offsetX-changeX2;
                    var newOffsetY = this.scenarioMoving.offsetY-changeY2;

                    this.scenarioActions.transformScenario(newOffsetX, newOffsetY, event.scale);
                }else if(this.nodeMoving){

                    var changeX = this.nodeMoving.x-event.x;
                    var changeY = this.nodeMoving.y-event.y;

                    var newX = this.nodeMoving.nodeX-changeX;
                    var newY = this.nodeMoving.nodeY-changeY;
                    this.scenarioActions.moveNode(this.nodeMoving.nodeName, newX, newY)
                }
            }else if(event.isWheel()){
                var dy = (event.payload.get('deltaY')/56)*0.05;
                let newScale = this.state.ui.scale+dy;
                if(newScale>0.3 && newScale<4) {
                    this.scenarioActions.transformScenario(this.state.ui.offsetX, this.state.ui.offsetY, newScale);
                }
            }
        }.bind(this);

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        <div className="max-width top-bar-height no-scrollbars bottom-edge">
                            <div>
                                <ScenarioControlPanel />
                                <span>OffsetX: {this.state.ui.offsetX}</span>
                                <span>OffsetY: {this.state.ui.offsetY}</span>
                                <span>Scale: {this.state.ui.scale}</span>
                            </div>
                        </div>
                        <ScenarioViewport
                            nodes={this.state.scenario.nodes}
                            connections={this.state.scenario.connections}
                            onMouseEvent={mouseDown}
                            offsetX={this.state.ui.offsetX}
                            offsetY={this.state.ui.offsetY}
                            scale={this.state.ui.scale}
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
