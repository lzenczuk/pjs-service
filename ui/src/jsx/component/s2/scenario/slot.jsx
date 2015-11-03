import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

export default class Slot extends React.Component {

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){

            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.slotMouseDownEvent(event.clientX, event.clientY, this.props.index, this.props.nodeName));
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){

            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.slotMouseUpEvent(event.clientX, event.clientY, this.props.index, this.props.nodeName));
        }
    }

    render(){

    	return(
    		<div
                className="slot"
                onMouseDown={this._onMouseDown.bind(this)}
                onMouseUp={this._onMouseUp.bind(this)}
            >
                <span className="label">{this.props.label}</span>
            </div>
    		)
    }

}

Slot.propertyTypes = {
	label: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
    nodeName: React.PropTypes.string.isRequired,
	onMouseEvent: React.PropTypes.func
};