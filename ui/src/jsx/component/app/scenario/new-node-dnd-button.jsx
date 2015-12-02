import React from 'react';
import { DragSource } from 'react-dnd';

import dndTypes from '../../../dnd-types'

const nodeSource = {

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { name: "Node"+new Date().getTime(), type: props.type };
    return item;
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class NewNodeDndButton extends React.Component {

    render() {
        const { connectDragSource } = this.props;

        return connectDragSource(
            <div className="button">{this.props.text}</div>
        )
    }
}

export default DragSource(dndTypes.newNode, nodeSource, collect)(NewNodeDndButton);
