import React from 'react';

import { DropTarget } from 'react-dnd';

let compName = 'DndTar';

const nodeSource = {

    drop(props, monitor, component) {
        console.log(compName+":drop");
    },

    hover(props, monitor, component){
        console.log(compName+":hover");
    },

    canDrop(props, monitor){
        console.log(compName+":canDrop");
        return true
    }
};

function collect(connect, monitor) {

    console.log(compName+":collect");

    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
    };
}

class DndTar extends React.Component {

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

        let style = {
            position: 'absolute',
            top: 10,
            left: 220,
            width: 200,
            height: 200,
            backgroundColor: 'blue'
        };

        return this.props.connectDropTarget(
            <div style={style}>dnd target</div>
        )
    }
}

export default DropTarget("dnd_type", nodeSource, collect)(DndTar);