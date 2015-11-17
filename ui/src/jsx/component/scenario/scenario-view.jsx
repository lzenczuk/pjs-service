import React from 'react';

import ScenarioViewport from '../s2/scenario-viewport'
import ScenarioControlPanel from './scenario-control-panel'

import ScenarioEvent from '../s2/scenario/scenario-event';

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
            case ScenarioEvent.eventType.MOUSE_DOWN: this._onMouseDownEvent(event); break;
            case ScenarioEvent.eventType.MOUSE_MOVE: this._onMouseMoveEvent(event); break;
            case ScenarioEvent.eventType.MOUSE_UP: this._onMouseUpEvent(event); break;
            case ScenarioEvent.eventType.WHEEL: this._onWheelEvent(event); break;
            case ScenarioEvent.eventType.SIZE: this._onSizeEvent(event); break;
            case ScenarioEvent.eventType.KEY: this._onKeyEvent(event); break;
        }
    }

    /**
     * @param {ScenarioEvent} event
     * @private
     */
    _onMouseDownEvent(event){

        var payload;

        switch (event.sourceType){
            case ScenarioEvent.sourceType.SCENARIO: {
                payload = {};
            } break;

            case ScenarioEvent.sourceType.NODE: {
                payload = {
                    nodeX: this.state.scenario.nodesMap[event.payload.get('nodeName')].x,
                    nodeY: this.state.scenario.nodesMap[event.payload.get('nodeName')].y,
                    nodeName: event.payload.get('nodeName')
                };
            } break;

            case ScenarioEvent.sourceType.CONNECTION: {
                payload = {};
            } break;

            case ScenarioEvent.sourceType.SLOT: {
                payload = {
                    index: event.payload.get('slotIndex'),
                    nodeName: event.payload.get('nodeName')
                };
            } break;
        }

        if(payload){
            this.scenarioActions.setActiveUiEvent(event, payload)
        }
    }

    _onMouseMoveEvent(event){
        let activeEvent = this.state.ui.state.activeEvent;
        let payload = this.state.ui.state.payload;

        if(activeEvent){
            if(activeEvent.isMouseDown() && activeEvent.isScenario()){

                var changeX = activeEvent.clientX-event.clientX;
                var changeY = activeEvent.clientY-event.clientY;

                var newOffsetX = activeEvent.offsetX-changeX;
                var newOffsetY = activeEvent.offsetY-changeY;

                this.scenarioActions.transformScenario(newOffsetX, newOffsetY, event.scale);
            }else if(activeEvent.isMouseDown() && activeEvent.isNode()){

                var changeX = activeEvent.x-event.x;
                var changeY = activeEvent.y-event.y;

                var newX = payload.nodeX-changeX;
                var newY = payload.nodeY-changeY;
                this.scenarioActions.moveNode(payload.nodeName, newX, newY)
            }else if(activeEvent.isMouseDown() && activeEvent.isSlot()){
                this.scenarioActions.drawConnectLine(activeEvent.x, activeEvent.y, event.x, event.y)
            }
        }
    }

    _onMouseUpEvent(event){
        let activeEvent = this.state.ui.state.activeEvent;
        let payload = this.state.ui.state.payload;

        this.scenarioActions.cleanUi();

        if(activeEvent && activeEvent.isMouseDown()) {
            if (activeEvent.isSlot() && (event.isNode() || event.isSlot())) {

                this.scenarioActions.addConnection(payload.nodeName, payload.index, event.payload.get('nodeName'))

            }else if(activeEvent.isNode() && event.isNode() && activeEvent.x==event.x && activeEvent.y==event.y){

                this.scenarioActions.selectElements([{type: 'NODE', name: event.payload.get('nodeName')}]);

            }else if(activeEvent.isScenario() && activeEvent.clientX==event.clientX && activeEvent.clientY==event.clientY){

                this.scenarioActions.selectElements([]);

            }else if(activeEvent.isConnection() && activeEvent.x==event.x && activeEvent.y==event.y){

                this.scenarioActions.selectElements([{type: 'CONNECTION', name: event.payload.get('connectionId')}]);
            }
        }
    }

    _onWheelEvent(event){
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

    _onSizeEvent(event){
        this.scenarioActions.resizeNodes(event.payload);
    }

    _onKeyEvent(event){

        // del or backspace
        if(event.payload==46 || event.payload==8){
            this.scenarioActions.deleteSelectedElements()
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
                        <ScenarioViewport
                            nodes={this.state.scenario.nodes}
                            selectedNodes={this.state.ui.selectedNodeName}
                            selectedConnection={this.state.ui.selectedConnection}
                            connections={this.state.scenario.connections}
                            onMouseEvent={this._onEvent.bind(this)}
                            offsetX={this.state.scenario.offsetX}
                            offsetY={this.state.scenario.offsetY}
                            scale={this.state.scenario.scale}
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
