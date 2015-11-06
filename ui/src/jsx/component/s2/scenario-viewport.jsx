import React from 'react';

import ConnectionLine from './connection-line';
import ScenarioGraph from './scenario/scenario-graph';

import ScenarioMouseEvent from './scenario/scenario-mouse-event';

import ctx from '../../context';

import { DropTarget } from 'react-dnd';

import dndTypes from '../../dnd/dnd-types';

// ----------------------- dnd
const nodesTarget = {
    drop(props, monitor, component) {

        const item = monitor.getItem();

        var offset = component._componentPositionInClientSpace();
        var clientPosition = monitor.getClientOffset();

        var node = {
            "class" : "script_node",
            "x" : (clientPosition.x - offset.x - props.offsetX)/props.scale,
            "y" : (clientPosition.y - offset.y - props.offsetY)/props.scale,
            "name" : item.name,
            "description" : "New node",
            "script" : "function main(input, ctx){}",
            "slots" : {
                "slots" : [{
                    class: "always_true_slot",
                    nodeName: null,
                    label: null
                } ]
            },
            "executorName" : null
        };

        // TODO - move to component and use its method
        ctx.scenarioActions.addNode(node);
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

        if (this.props.onMouseEvent != null) {

            var offset = this._componentPositionInClientSpace();

            this.props.onMouseEvent(
                event.setStateBasedParams(
                    (event.clientX - offset.x - this.props.offsetX)/this.props.scale,
                    (event.clientY - offset.y - this.props.offsetY)/this.props.scale,
                    this.props.offsetX,
                    this.props.offsetY,
                    this.props.scale,
                    offset.width,
                    offset.height
                ));
        }
    }

    _onMouseDown(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioMouseEvent.scenarioMouseDownEvent(event.clientX, event.clientY));
        }
    }

    _onMouseUp(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioMouseEvent.scenarioMouseUpEvent(event.clientX, event.clientY));
        }
    }

    _onMouseMove(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioMouseEvent.scenarioMouseMoveEvent(event.clientX, event.clientY));
        }
    }

    _onWheel(event) {
        if (this.props.onMouseEvent != null) {
            event.preventDefault();
            event.stopPropagation();

            this._mouseEventsProxy(ScenarioMouseEvent.scenarioWheelEvent(event.deltaX, event.deltaY));
        }
    }

    render() {

        let translate = 'translate('+this.props.offsetX+'px, '+this.props.offsetY+'px)';
        let scale = 'scale('+this.props.scale+', '+this.props.scale+')';

        var viewportInternalElementStyle = {
            transform: translate+" "+scale
        };

        // ----------------------- dnd
        const { isOver, canDrop, connectDropTarget } = this.props;

        // ----------------------- dnd
        return connectDropTarget(
            <div
                ref={this._updateViewportElement.bind(this)}
                className="max top-bar-margin no-scrollbars"
                onMouseDown={this._onMouseDown.bind(this)}
                onMouseUp={this._onMouseUp.bind(this)}
                onMouseMove={this._onMouseMove.bind(this)}
                onWheel={this._onWheel.bind(this)}
            >
                <div>
                    <div
                        className="absolute-position"
                        style={viewportInternalElementStyle}
                    >
                        <ScenarioGraph
                            nodes={this.props.nodes}
                            connections={this.props.connections}
                            selectedNodes = {this.props.selectedNodes}
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

    _componentPositionInClientSpace() {
        var positionInClientSpace = this._viewportElement.getBoundingClientRect();
        var width = this._viewportElement.offsetWidth;
        var height = this._viewportElement.offsetHeight;
        return {x: positionInClientSpace.left, y: positionInClientSpace.top, width: width, height: height}
    }
}

ScenarioViewport.propertyTypes = {
    nodes: React.PropTypes.array.isRequired,
    connections: React.PropTypes.array.isRequired,
    selectedNodes: React.PropTypes.array.isRequired,
    offsetX: React.PropTypes.number.isRequired,
    offsetY: React.PropTypes.number.isRequired,
    scale: React.PropTypes.number.isRequired,
    onMouseEvent: React.PropTypes.func,
    connectionLine: React.PropTypes.object
};

// ----------------------- dnd
export default DropTarget(dndTypes.newNode, nodesTarget, collect)(ScenarioViewport);
