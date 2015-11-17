import React from 'react';

import ScenarioViewport from './scenario-viewport'
import ScenarioEvent from './scenario-event';
import {
    ScenarioTransformEvent,
    NodeDragEvent,
    ConnectionCreatedEvent,
    SelectEvent,
    DeleteSelectedEvent,
    NodesResizeEvent
} from './scenario-high-level-even';

export default
class ScenarioEd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            connectionLine: null,
            activeEvent: null,
            payload: null
        }
    }

    _dispatchEvent(event){
        if(this.props.onEvent){
            this.props.onEvent(event)
        }
    }

    /**
     * @param {ScenarioEvent} event
     * @private
     */
    _onEvent(event) {

        switch (event.eventType) {
            case ScenarioEvent.eventType.MOUSE_DOWN:
                this._onMouseDownEvent(event);
                break;
            case ScenarioEvent.eventType.MOUSE_MOVE:
                this._onMouseMoveEvent(event);
                break;
            case ScenarioEvent.eventType.MOUSE_UP:
                this._onMouseUpEvent(event);
                break;
            case ScenarioEvent.eventType.WHEEL:
                this._onWheelEvent(event);
                break;
            case ScenarioEvent.eventType.SIZE:
                this._onSizeEvent(event);
                break;
            case ScenarioEvent.eventType.KEY:
                this._onKeyEvent(event);
                break;
        }
    }

    /**
     * @param {ScenarioEvent} event
     * @private
     */
    _onMouseDownEvent(event) {

        var payload;

        switch (event.sourceType) {
            case ScenarioEvent.sourceType.SCENARIO:
            {
                payload = {};
            }
                break;

            case ScenarioEvent.sourceType.NODE:
            {
                payload = {
                    nodeX: this.props.model.nodesMap[event.payload.get('nodeName')].x,
                    nodeY: this.props.model.nodesMap[event.payload.get('nodeName')].y,
                    nodeY: this.props.model.nodesMap[event.payload.get('nodeName')].y,
                    nodeName: event.payload.get('nodeName')
                };
            }
                break;

            case ScenarioEvent.sourceType.CONNECTION:
            {
                payload = {};
            }
                break;

            case ScenarioEvent.sourceType.SLOT:
            {
                payload = {
                    index: event.payload.get('slotIndex'),
                    nodeName: event.payload.get('nodeName')
                };
            }
                break;
        }

        if (payload) {
            this.setState({
                activeEvent: event,
                payload: payload
            })
        }
    }

    _onMouseMoveEvent(event) {
        let activeEvent = this.state.activeEvent;
        let payload = this.state.payload;

        if (activeEvent) {
            if (activeEvent.isMouseDown() && activeEvent.isScenario()) {

                var changeX = activeEvent.clientX - event.clientX;
                var changeY = activeEvent.clientY - event.clientY;

                var newOffsetX = activeEvent.offsetX - changeX;
                var newOffsetY = activeEvent.offsetY - changeY;

                this._dispatchEvent(new ScenarioTransformEvent(newOffsetX, newOffsetY, event.scale))
            } else if (activeEvent.isMouseDown() && activeEvent.isNode()) {

                var changeX = activeEvent.x - event.x;
                var changeY = activeEvent.y - event.y;

                var newX = payload.nodeX - changeX;
                var newY = payload.nodeY - changeY;

                this._dispatchEvent(new NodeDragEvent(payload.nodeName, newX, newY))

            } else if (activeEvent.isMouseDown() && activeEvent.isSlot()) {

                this.setState({
                    connectionLine: {sx: activeEvent.x, sy: activeEvent.y, dx: event.x, dy: event.y},
                    activeEvent: activeEvent,
                    payload: payload
                })
            }
        }
    }

    _onMouseUpEvent(event) {
        let activeEvent = this.state.activeEvent;
        let payload = this.state.payload;

        this.setState({
            connectionLine: null,
            activeEvent: null,
            payload: null
        });

        if (activeEvent && activeEvent.isMouseDown()) {
            if (activeEvent.isSlot() && (event.isNode() || event.isSlot())) {

                this._dispatchEvent(new ConnectionCreatedEvent(payload.nodeName, payload.index, event.payload.get('nodeName')))

            } else if (activeEvent.isNode() && event.isNode() && activeEvent.x == event.x && activeEvent.y == event.y) {

                this._dispatchEvent(new SelectEvent([{type: 'NODE', name: event.payload.get('nodeName')}]));

            } else if (activeEvent.isScenario() && activeEvent.clientX == event.clientX && activeEvent.clientY == event.clientY) {

                this._dispatchEvent(new SelectEvent([]));

            } else if (activeEvent.isConnection() && activeEvent.x == event.x && activeEvent.y == event.y) {

                this._dispatchEvent(new SelectEvent([{type: 'CONNECTION', name: event.payload.get('connectionId')}]));
            }
        }
    }

    _onWheelEvent(event) {
        var scaleDelta = (event.payload.get('deltaY') / 56) * 0.05;
        let newScale = event.scale + scaleDelta;

        let distX = (event.width / 2) - event.offsetX;
        let distY = (event.height / 2) - event.offsetY;

        let realDistX = distX / event.scale;
        let realDistY = distY / event.scale;

        let newDistX = realDistX * newScale;
        let newDistY = realDistY * newScale;

        let distXDelta = newDistX - distX;
        let distYDelta = newDistY - distY;

        let newOffsetX = event.offsetX - distXDelta;
        let newOffsetY = event.offsetY - distYDelta;

        if (newScale > 0.3 && newScale < 2) {
            this._dispatchEvent(new ScenarioTransformEvent(newOffsetX, newOffsetY, newScale))
        }
    }

    _onSizeEvent(event) {
        this._dispatchEvent(new NodesResizeEvent(event.payload))
    }

    _onKeyEvent(event) {

        // del or backspace
        if (event.payload == 46 || event.payload == 8) {
            this._dispatchEvent(new DeleteSelectedEvent())
        }
    }

    render() {
        return (
            <div>
                <ScenarioViewport
                    model={this.props.model}
                    selectedNodes={this.props.selectedNodes}
                    selectedConnection={this.props.selectedConnection}
                    onMouseEvent={this._onEvent.bind(this)}
                    connectionLine={this.state.connectionLine}
                />
            </div>
        )
    }
}
