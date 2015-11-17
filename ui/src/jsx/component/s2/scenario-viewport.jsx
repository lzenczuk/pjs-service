import React from 'react';
import ScenarioGraph from './scenario-graph/scenario-graph';
import ScenarioEditor from './scenario-editor-controls/scenario-editor';
import ScenarioLowLevelEvent from './scenario-low-level-event';
import ctx from '../../context';
import ServerModel from '../../model/server-model';

import { DropTarget } from 'react-dnd';

import dndTypes from '../../dnd/dnd-types';

// ----------------------- dnd
const nodesTarget = {
    drop(props, monitor, component) {

        const item = monitor.getItem();

        var offset = component._componentPositionInClientSpace();
        var clientPosition = monitor.getClientOffset();

        var node = {
            "serverClass" : "script_node",
            "x" : (clientPosition.x - offset.x - props.model.offsetX)/props.model.scale,
            "y" : (clientPosition.y - offset.y - props.model.offsetY)/props.model.scale,
            "name" : item.name,
            "description" : "New node",
            "script" : "function main(input, ctx){}",
            "slots" : {
                "slots" : [{
                    serverClass: "always_true_slot",
                    nodeName: null,
                    label: null
                } ]
            },
            "executorName" : null
        };

        // TODO - move to component and use its method
        ctx.scenarioActions.addNode(ServerModel.nodeFromServerModel(node));
    }
};

// ----------------------- dnd
function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
}

class ScenarioViewport extends React.Component {

    constructor(props) {
        super(props);
        this._viewportElement = null;
    }

    _mouseEventsProxy(event) {

        if(this._keyInterceptorElement){
            this._keyInterceptorElement.focus()
        }

        if (this.props.onMouseEvent != null) {

            var offset = this._componentPositionInClientSpace();

            this.props.onMouseEvent(
                event.setStateBasedParams(
                    (event.clientX - offset.x - this.props.model.offsetX)/this.props.model.scale,
                    (event.clientY - offset.y - this.props.model.offsetY)/this.props.model.scale,
                    this.props.model.offsetX,
                    this.props.model.offsetY,
                    this.props.model.scale,
                    offset.width,
                    offset.height
                ));
        }
    }

    _onMouseDown(event) {

        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioLowLevelEvent.scenarioMouseDownEvent(event.clientX, event.clientY));
        }
    }

    _onMouseUp(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioLowLevelEvent.scenarioMouseUpEvent(event.clientX, event.clientY));
        }
    }

    _onMouseMove(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioLowLevelEvent.scenarioMouseMoveEvent(event.clientX, event.clientY));
        }
    }

    _onWheel(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioLowLevelEvent.scenarioWheelEvent(event.deltaX, event.deltaY));
        }
    }

    _onKeyUp(event) {

        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioLowLevelEvent.keyPressEvent(event.keyCode));
        }
    }

    render() {

        let translate = 'translate('+this.props.model.offsetX+'px, '+this.props.model.offsetY+'px)';
        let scale = 'scale('+this.props.model.scale+', '+this.props.model.scale+')';

        var viewportInternalElementStyle = {
            transform: translate+" "+scale
        };

        // ----------------------- dnd
        const { isOver, canDrop, connectDropTarget } = this.props;

        // ----------------------- dnd

        // tabindex is required to allow focus on div
        return connectDropTarget(
            <div
                ref={this._updateViewportElement.bind(this)}
                className="max top-bar-margin no-scrollbars"
                onMouseDown={this._onMouseDown.bind(this)}
                onMouseUp={this._onMouseUp.bind(this)}
                onMouseMove={this._onMouseMove.bind(this)}
                onWheel={this._onWheel.bind(this)}
            >
                <input
                    className="key-interceptor"
                    ref={this._updateKeyInterceptorElement.bind(this)}
                    onKeyUp={this._onKeyUp.bind(this)}
                />
                <div>
                    <div
                        className="absolute-position"
                        style={viewportInternalElementStyle}
                    >
                        <ScenarioGraph
                            model={this.props.model}
                            selectedConnection = {this.props.selectedConnection}
                            onMouseEvent={this._mouseEventsProxy.bind(this)}
                        />
                    </div>
                    <div
                        className="absolute-position"
                        style={viewportInternalElementStyle}
                    >
                        <ScenarioEditor
                            model={this.props.model}
                            selectedNodes = {this.props.selectedNodes}
                            selectedConnection = {this.props.selectedConnection}
                            connectionLine={this.props.connectionLine}
                            onMouseEvent={this._mouseEventsProxy.bind(this)}
                        />
                    </div>
                </div>
            </div>)
    }

    _updateViewportElement(el){
        this._viewportElement = el;
    }

    _updateKeyInterceptorElement(el){
        this._keyInterceptorElement = el;
    }

    _componentPositionInClientSpace() {
        var positionInClientSpace = this._viewportElement.getBoundingClientRect();
        var width = this._viewportElement.offsetWidth;
        var height = this._viewportElement.offsetHeight;
        return {x: positionInClientSpace.left, y: positionInClientSpace.top, width: width, height: height}
    }
}

ScenarioViewport.propertyTypes = {
    model: React.PropTypes.array.isRequired,
    selectedNodes: React.PropTypes.array.isRequired,
    selectedConnection: React.PropTypes.string,
    onMouseEvent: React.PropTypes.func,
    connectionLine: React.PropTypes.object
};

// ----------------------- dnd
export default DropTarget(dndTypes.newNode, nodesTarget, collect)(ScenarioViewport);
