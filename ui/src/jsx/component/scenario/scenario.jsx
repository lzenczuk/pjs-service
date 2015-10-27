import React from 'react';
import Node from './node';
import Connection from './connection';
import ConnectionLine from './connection-line';

import ctx from '../../context';

import { DropTarget } from 'react-dnd';

import dndTypes from '../../dnd/dnd-types';

const nodesTarget = {
    drop(props, monitor, component) {
    
    const item = monitor.getItem();

    var clientPosition = monitor.getClientOffset();
    var elemantPosition = component.getOffsetToClient();

    ctx.scenarioActions.addNode(
        clientPosition.x - elemantPosition.x, 
        clientPosition.y - elemantPosition.y, 
        { name: item.name });
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class Scenario extends React.Component {

    constructor(props){
        super(props);

        this.scenarioActions = ctx.scenarioActions

        this._mainElement = null;

        this.state = {};
    }

    getOffsetToClient(){
        var clientPosition = this._mainElement.getBoundingClientRect();
        return {x: clientPosition.left, y: clientPosition.top}
    }

    onMouseDownOnNode(data){
        this.setState(data)
    }

    onMouseDownOnSlot(data){
        this.setState(data)
    }

    onMouseMove(event){
        if(this.state.type=="NODE_MOUSE_DOWN"){
            var nx = this.state.dx+event.clientX-this.state.cdx;
            var ny = this.state.dy+event.clientY-this.state.cdy;

            this.scenarioActions.moveNode(this.state.name, nx, ny);
        }else if(this.state.type=="SLOT_MOUSE_DOWN"){

            var ep = this.getOffsetToClient();

            var data = {
                type: this.state.type,
                sx: this.state.cx - ep.x,
                sy: this.state.cy - ep.y,
                dx: event.clientX - ep.x,
                dy: event.clientY - ep.y
            };

            this.setState(data)
        }
    }

    onMouseUp(event){
        this.setState({type: "none"})
    }

    onMouseLeave(event){
        this.setState({type: "none"})
    }

    render(){

        if(this.props.model==null){
            return ( <div className="max"></div> )
        }

        var nodes = this.props.model.nodes.map(n => <Node key={n.name} model={n} onMouseDown={this.onMouseDownOnNode.bind(this)} onMouseDownOnSlot={this.onMouseDownOnSlot.bind(this)}/>);
        var connections = this.props.model.connections.map(c => <Connection key={c.src+c.des+c.index} model={c}/>);

        const { isOver, canDrop, connectDropTarget } = this.props;

        if(this.state.type=="NODE_MOUSE_DOWN"){

            return connectDropTarget(
                <div className="max"
                     ref={(el) => this._mainElement = el}
                     onMouseMove={this.onMouseMove.bind(this)}
                     onMouseLeave={this.onMouseLeave.bind(this)}
                     onMouseUp={this.onMouseUp.bind(this)}>
                    <div>
                        {connections}
                        {nodes}
                    </div>
                </div>
            )
        }

        if(this.state.type=="SLOT_MOUSE_DOWN"){

            return connectDropTarget(
                <div className="max"
                     ref={(el) => this._mainElement = el}
                     onMouseMove={this.onMouseMove.bind(this)}
                     onMouseLeave={this.onMouseLeave.bind(this)}
                     onMouseUp={this.onMouseUp.bind(this)}>
                    <div>
                        {connections}
                        {nodes}
                        <ConnectionLine model={this.state} />
                    </div>
                </div>
            )
        }

        return connectDropTarget(
            <div className="max" ref={(el) => this._mainElement = el}>
                <div>
                    {connections}
                    {nodes}
                </div>
            </div>
        )
    }
}

export default DropTarget(dndTypes.newNode, nodesTarget, collect)(Scenario);
