import React from 'react';
import { DragSource } from 'react-dnd';

const nodeSource = {

    beginDrag(props, monitor, component) {

        const item = { id: props.id };

        setTimeout(function(){
            props.onEvent(item)
        }.bind(this), 0);

        return item;
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
    };
}

class RedNote extends React.Component {

    render() {
        return this.props.connectDragSource(
            <div className="red-note">
                <span className="title">{this.props.title}</span>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

RedNote.propertyTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string
};

export default DragSource("note_dnd", nodeSource, collect)(RedNote);