import React from 'react';
import ScenarioLowLevelEvent from '../scenario-low-level-event'

export default class Slot extends React.Component {

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){

            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioLowLevelEvent.slotMouseDownEvent(event.clientX, event.clientY, this.props.index, this.props.nodeId));
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){

            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioLowLevelEvent.slotMouseUpEvent(event.clientX, event.clientY, this.props.index, this.props.nodeId));
        }
    }

    render(){

    	return(
    		<div className="slot" >
                <span
                    className="label"
                    onMouseDown={this._onMouseDown.bind(this)}
                    onMouseUp={this._onMouseUp.bind(this)}
                >
                    {this.props.label}
                </span>
            </div>
    		)
    }

}

Slot.propertyTypes = {
	label: React.PropTypes.string.isRequired,
	index: React.PropTypes.number.isRequired,
    nodeId: React.PropTypes.number.isRequired,
	onMouseEvent: React.PropTypes.func
};