import React from 'react';

export default class SelectedNode extends React.Component {

    render(){

        var style = {
            top: this.props.model.y,
            left: this.props.model.x,
            width: this.props.model.width,
            height: this.props.model.height
        };

        return(
            <div className="node-select-box"
                 style={style}
            >
            </div>
        )
    }
}

Node.propertyTypes = {
    model: React.PropTypes.object,
    onMouseEvent: React.PropTypes.func
};

