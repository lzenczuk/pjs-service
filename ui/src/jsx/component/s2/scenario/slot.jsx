import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

export default class Slot extends React.Component {


    _onMouseDown(event){

        console.log("Mouse down on slot");
        
        event.preventDefault();
        event.stopPropagation();

        if(this.props.onMouseDown!=null){
            this.props.onMouseDown(ScenarioMouseEvent.slotMouseDownEvent(event.clientX, event.clientY, this.props.index, this.props.nodeName));
        }
    }

    render(){

    	return(
    		<div className="slot" onMouseDown={this._onMouseDown.bind(this)} >{this.props.label}</div>
    		)
    }

}

Slot.propertyTypes = {
	label: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
    nodeName: React.PropTypes.string.isRequired,
	onMouseDown: React.PropTypes.func
};