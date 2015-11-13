import React from 'react';
import { DragSource } from 'react-dnd';

const nodeSource = {

    beginDrag(props, monitor, component) {

        const item = {type: 'note_dragged', id: props.id };

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

class BlueNote extends React.Component {

    render() {

        return this.props.connectDragSource(
            <div className="blue-note">
                <span className="title">{this.props.title}</span>
                <p>{this.props.number}</p>
            </div>
        )
    }
}

BlueNote.propertyTypes = {
    id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    number: React.PropTypes.number
};

export default DragSource("note_dnd", nodeSource, collect)(BlueNote);