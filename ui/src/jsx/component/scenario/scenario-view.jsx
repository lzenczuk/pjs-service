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
            }else if(event.isMouseDown() && event.isSlot()){
                console.log("Event: "+JSON.stringify(event));

                this.connectionLineMoving = {
                    x: event.x,
                    y: event.y,
                    index: event.payload.get('slotIndex'),
                    nodeName: event.payload.get('nodeName')
                }
            }else if(event.isMouseUp()){
                console.log("-----------------> Up event: "+JSON.stringify(event));
                this.scenarioActions.cleanUi();

                if(this.connectionLineMoving && (event.isNode()||event.isSlot())){
                    this.scenarioActions.addConnection(this.connectionLineMoving.nodeName, this.connectionLineMoving.index, event.payload.get('nodeName'))
                }

                this.scenarioMoving=null;
                this.nodeMoving=null;
                this.connectionLineMoving=null;
            }else if(event.isMouseMove()){
                if(this.scenarioMoving){

                    var changeX = this.scenarioMoving.clientX-event.clientX;
                    var changeY = this.scenarioMoving.clientY-event.clientY;

                    var newOffsetX = this.scenarioMoving.offsetX-changeX;
                    var newOffsetY = this.scenarioMoving.offsetY-changeY;

                    this.scenarioActions.transformScenario(newOffsetX, newOffsetY, event.scale);
                }else if(this.nodeMoving){

                    var changeX = this.nodeMoving.x-event.x;
                    var changeY = this.nodeMoving.y-event.y;

                    var newX = this.nodeMoving.nodeX-changeX;
                    var newY = this.nodeMoving.nodeY-changeY;
                    this.scenarioActions.moveNode(this.nodeMoving.nodeName, newX, newY)
                }else if(this.connectionLineMoving){
                    console.log("drawing line: "+this.connectionLineMoving.x+"; "+this.connectionLineMoving.y+"; "+event.x+"; "+event.y);
                    this.scenarioActions.drawConnectLine(this.connectionLineMoving.x, this.connectionLineMoving.y, event.x, event.y)
                }
            }else if(event.isWheel()){
                var scaleDelta = (event.payload.get('deltaY')/56)*0.05;
                let newScale = event.scale+scaleDelta;

                let distX = (event.width/2)-event.offsetX;
                let distY = (event.height/2)-event.offsetY;

                let realDistX = distX/event.scale;
                let realDistY = distY/event.scale;

                let newDistX = realDistX*newScale;
                let newDistY = realDistY*newScale;

                let distXDelta = newDistX-distX;
                let distYDelta = newDistY-distY;

                let newOffsetX = event.offsetX-distXDelta;
                let newOffsetY = event.offsetY-distYDelta;

                if(newScale>0.3 && newScale<2) {
                    this.scenarioActions.transformScenario(newOffsetX, newOffsetY, newScale);
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
                            </div>
                        </div>
                        <ScenarioViewport
                            nodes={this.state.scenario.nodes}
                            connections={this.state.scenario.connections}
                            onMouseEvent={mouseDown}
                            offsetX={this.state.ui.offsetX}
                            offsetY={this.state.ui.offsetY}
                            scale={this.state.ui.scale}
                            connectionLine={this.state.ui.connectionLine}
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
