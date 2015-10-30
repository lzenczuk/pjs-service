import React from 'react';

import ConnectionLine from './connection-line';
import ScenarioGraph from './scenario/scenario-graph';

import ScenarioMouseEvent from './scenario/scenario-mouse-event';

export default class ScenarioViewport extends React.Component {

    constructor(props) {
        super(props);
        this._viewportElement = null;
    }

    _mouseEventsProxy(event) {
        console.log("--> Event proxy: " + JSON.stringify(event));

        if (this.props.onMouseEvent != null) {

            var offset = this._componentPositionInClientSpace();

            this.props.onMouseEvent(
                event.setPosition(
                    event.clientX - offset.x - this.props.offsetX,
                    event.clientY - offset.y - this.props.offsetY
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

    render() {

        var viewportInternalElementStyle = {
            top: this.props.offsetY,
            left: this.props.offsetX
        };

        return (
            <div
                ref={this._updateViewportElement.bind(this)}
                className="max top-bar-margin no-scrollbars"
                onMouseDown={this._onMouseDown.bind(this)}
                onMouseUp={this._onMouseUp.bind(this)}
            >
                <div>
                    <div
                        className="absolute-position"
                        style={viewportInternalElementStyle}
                    >
                        <ScenarioGraph
                            nodes={this.props.nodes}
                            connections={this.props.connections}
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
        return {x: positionInClientSpace.left, y: positionInClientSpace.top}
    }
}

ScenarioViewport.propertyTypes = {
    nodes: React.PropTypes.array.isRequired,
    connections: React.PropTypes.array.isRequired,
    offsetX: React.PropTypes.number.isRequired,
    offsetY: React.PropTypes.number.isRequired,
    onMouseEvent: React.PropTypes.func
};

