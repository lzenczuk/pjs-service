import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

import Slot from './slot'


export default class Node extends React.Component {

    _onMouseDown(event){
        event.preventDefault();
        event.stopPropagation();

        if(this.props.onMouseDown!=null){
            this.props.onMouseDown(ScenarioMouseEvent.nodeMouseDownEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    _onMouseUp(event){
        event.preventDefault();
        event.stopPropagation();

        if(this.props.onMouseUp!=null){
            this.props.onMouseUp(ScenarioMouseEvent.nodeMouseUpEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    render(){

        var style = {
            top: this.props.y,
            left: this.props.x,
            width: 210
        };

        var slots = this.props.slots.map((slot, index) =>
            <Slot key={this.props.name+index} label={slot.label} index={index} nodeName={this.props.name} onMouseDown={this.props.onMouseDown} />
        );

        return(
            <div className="box" style={style} onMouseDown={this._onMouseDown.bind(this)} onMouseUp={this._onMouseUp.bind(this)}>
                <div className="title">{this.props.name}</div>
                <div className="script">{this.props.description}</div>
                <div>
                    {slots}
                </div>
            </div>
        )
    }
}

Node.propertyTypes = {
	name: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	slots: React.PropTypes.array.isRequired,
	onMouseDown: React.PropTypes.func,
	onMouseUp: React.PropTypes.func
}
