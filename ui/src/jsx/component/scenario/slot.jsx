import React from 'react';

export default class Slot extends React.Component {

    constructor(props){
        super(props);
    }

    _onMouseDown(event){

        console.log("Mouse down on slot");
        
        event.preventDefault();
        event.stopPropagation();

        if(this.props.onMouseDown!=null){

            this.props.onMouseDown({
                cx: event.clientX,
                cy: event.clientY,
                slotIndex: this.props.index})
        }
    }

    render(){

    	var style={
    		top: this.props.y,
    		left: this.props.x,
			width: this.props.width
    	};

    	if(this.props.slot!=null){
    		if(this.props.slot.class=="script_slot"){
    			return (<div className="slot" style={style} onMouseDown={this._onMouseDown.bind(this)}><span className="label">{this.props.slot.label}</span></div>)
    		}
    	}

        return (<div className="slot" style={style} onMouseDown={this._onMouseDown.bind(this)}></div>)
    }

}
