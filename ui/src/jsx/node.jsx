import React from 'react';

export default class Node extends React.Component {
    render(){

        var positionStyle = {
            top: this.props.model.y+"px",
            left: this.props.model.x+"px"
        };

        return(
            <div className="box" style={positionStyle}>
                <div className="title">{this.props.model.name}</div>
                <div className="script">{this.props.model.script}</div>
            </div>
        )
    }
}