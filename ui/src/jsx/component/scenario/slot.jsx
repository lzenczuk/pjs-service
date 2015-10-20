import React from 'react';

export default class Slot extends React.Component {

    constructor(props){
        super(props);
    }

    render(){

    	var style={
    		top: this.props.y,
    		left: this.props.x
    	}

    	if(this.props.slot!=null){
    		if(this.props.slot.class=="script_slot"){
    			return (<div className="slot" style={style}><span className="label">{this.props.slot.label}</span></div>)
    		}
    	}

        return (<div className="slot" style={style}></div>)
    }

}
