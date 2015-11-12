import React from 'react';
import { DragSource } from 'react-dnd';

let compName = 'DndSrc';

const nodeSource = {

    beginDrag(props, monitor, component) {

        console.log(compName+":beginDrag");

        // Return the data describing the dragged item
        const item = { name: "dnd-src-data" };
        return item;
    },

    endDrag(props, monitor, component){
        console.log(compName+":endDrag");
    },

    canDrag(props, monitor){
        console.log(compName+":canDrag");

        return true;
    },

    isDragging(props, monitor){
        console.log(compName+":isDragging");
    }
};

function collect(connect, monitor) {

    console.log(compName+":collect");

    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
    };
}

class DndSrc extends React.Component {

    constructor(props){
        super(props);

        console.log(compName+":constructor")
    }

    componentWillMount(){
        console.log(compName+":componentWillMount")
    }

    componentDidMount(){
        console.log(compName+":componentDidMount")
    }

    componentWillUpdate(nextProps, nextState){
        console.log(compName+":componentWillUpdate")
    }

    componentDidUpdate(prevProps, prevState){
        console.log(compName+":componentDidUpdate")
    }

    render() {

        console.log(compName+":render")

        let style = {
            position: 'absolute',
            top: 10,
            left: 400,
            width: 200,
            height: 200,
            backgroundColor: 'red'
        };

        return this.props.connectDragSource(
            <div style={style}>dnd src</div>
        )
    }
}

export default DragSource("dnd_type", nodeSource, collect)(DndSrc);
