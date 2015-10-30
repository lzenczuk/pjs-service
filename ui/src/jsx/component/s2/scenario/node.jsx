import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

import Slot from './slot'


export default class Node extends React.Component {

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.nodeMouseDownEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.nodeMouseUpEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    render(){

        var style = {
            top: this.props.y,
            left: this.props.x,
            width: 210
        };

        var slots = this.props.slots.map((slot, index) =>
            <Slot key={this.props.name+index}
                  label={slot.label}
                  index={index}
                  nodeName={this.props.name}
                  onMouseEvent={this.props.onMouseEvent}
            />
        );

        return(
            <div className="box"
                 style={style}
                 onMouseDown={this._onMouseDown.bind(this)}
                 onMouseUp={this._onMouseUp.bind(this)}
            >
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
	onMouseEvent: React.PropTypes.func
};

