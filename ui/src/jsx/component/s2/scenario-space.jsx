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

class ScenarioSpace extends React.Component {

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

    onMouseUpOnNode(data){
        if(this.state.type=="SLOT_MOUSE_DOWN"){
            var srcNodeName = this.state.nodeName;
            var desNodeName = data.nodeName;
            var slotIndex = this.state.slotIndex

            this.scenarioActions.addConnection(srcNodeName, slotIndex, desNodeName)

            this.setState({type: "none"})
        }else{
            this.setState({type: "none"})
        }
    }

    onMouseDownOnSlot(data){

        var ep = this.getOffsetToClient();

        var data2 = {
            type: data.type,
            cx: data.cx,
            cy: data.cy,
            sx: data.cx - ep.x,
            sy: data.cy - ep.y,
            dx: data.cx - ep.x,
            dy: data.cy - ep.y,
            nodeName: data.nodeName,
            slotIndex: data.slotIndex
        };

        this.setState(data2)
    }

    onMouseUpOnSlot(data){
        
    }

    onMouseMove(event){
        if(this.state.type=="NODE_MOUSE_DOWN"){
            var nx = this.state.dx+event.clientX-this.state.cdx;
            var ny = this.state.dy+event.clientY-this.state.cdy;

            this.scenarioActions.moveNode(this.state.name, nx, ny);
        }else if(this.state.type=="SLOT_MOUSE_DOWN"){

            var ep = this.getOffsetToClient();

            // TODO - change to immutable
            var data = JSON.parse(JSON.stringify(this.state));
            data.sx = this.state.cx - ep.x;
            data.sy = this.state.cy - ep.y;
            data.dx = event.clientX - ep.x;
            data.dy = event.clientY - ep.y;

            this.setState(data)
        }
    }

    onMouseUp(event){
        console.log("==========> onMouseUp")
        this.setState({type: "none"})
    }

    onMouseLeave(event){
        console.log("==========> onMouseLeave")
        this.setState({type: "none"})
    }

    render(){

        console.log("render`")

        if(this.props.model==null){
            return ( <div className="max"></div> )
        }

        var nodes = this.props.model.nodes.map(n =>
            <Node key={n.name} model={n}
                  onMouseDown={this.onMouseDownOnNode.bind(this)}
                  onMouseUp={this.onMouseUpOnNode.bind(this)}
                  onMouseDownOnSlot={this.onMouseDownOnSlot.bind(this)}/>);

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
            <div className="max top-bar-margin scrollbars">
                <Scenario nodes={this.properties.nodes} connections={this.properties.connections} />
            </div>
        )
    }
}

export default DropTarget(dndTypes.newNode, nodesTarget, collect)(Scenario);
