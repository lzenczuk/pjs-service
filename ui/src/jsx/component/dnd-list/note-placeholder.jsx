import React from 'react';
import { DropTarget } from 'react-dnd';

const nodeSource = {

    drop(props, monitor, component) {
        console.log("NotePlaceholder:drop");
    },

    hover(props, monitor, component){
        console.log("NotePlaceholder:hover");

        const item = {type: 'note_over', index: props.index };

        setTimeout(function(){
            props.onEvent(item)
        }.bind(this), 0);
    }
};

function collect(connect, monitor) {

    console.log("NotePlaceholder:collect");

    return {
        connectDropTarget: connect.dropTarget()
    };
}

class NotePlaceholder extends React.Component {

    render() {

        return this.props.connectDropTarget(
            <div className="placeholder">
                {this.props.children}
            </div>
        )
    }
}

export default DropTarget("note_dnd", nodeSource, collect)(NotePlaceholder);