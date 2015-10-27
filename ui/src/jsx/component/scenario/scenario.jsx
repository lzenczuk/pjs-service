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

    static _slotWidth(){
        // this is related to css - TODO - fix this
        return 70
    }

    static _nodeHeight(){
        // this is related to css - TODO - fix this
        return 75
    }

    constructor(props){
        super(props);

        this._mainElement = null;

        this.scenarioActions = ctx.scenarioActions

        if(props!=null){
            this.state = this.updateInternalModel(this.convertPropertiesToInternalModel(props.model));
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps!=null){
            var model = this.updateInternalModel(this.convertPropertiesToInternalModel(nextProps.model));
            var s = this.state;
            this.setState({nodes: model.nodes, nodesMap: model.nodesMap, connections: model.connections, selected: s.selected})
        }
    }

    convertPropertiesToInternalModel(propsModel){

        var nodes = [];
        var nameToNodeMap = {};
        var connections = [];

        Object.keys(propsModel.nodesMap).forEach(nodeName => {
            var node = propsModel.nodesMap[nodeName];
            var slots = node.slots.slots;

            nodes.push(node);
            nameToNodeMap[node.name] = node;

            slots.forEach((s, index) => {
                var connection = {src: node.name, des: s.nodeName, srcX: 0, srcY: 0, desX: 0, desY: 0, index: index, total: slots.length};
                connections.push(connection)
            })
        });

        return {
            nodes: nodes,
            nodesMap: nameToNodeMap,
            connections: connections
        };
    }

    updateInternalModel(model){

        model.nodes.forEach(node => {
            var slots = node.slots.slots;

            if(slots.length<=3){
                node.uiWidth=Scenario._slotWidth()*3;
            }else{
                node.uiWidth=Scenario._slotWidth()*slots.length;
            }            
        });

        model.connections.forEach(connection => {
            var src = model.nodesMap[connection.src];
            var des = model.nodesMap[connection.des];

            var sx = src.x+connection.index*Scenario._slotWidth()+(Scenario._slotWidth()/2);

            if(connection.total==1){
                sx = (src.x+src.uiWidth/2)    
            }else if(connection.total==2){
                sx = src.x+connection.index*(src.uiWidth/2)+((src.uiWidth/2)/2);                
            }

            var sy = src.y+Scenario._nodeHeight();

            var dx = (des.x+des.uiWidth/2);
            var dy = des.y;

            connection.srcX = sx;
            connection.srcY = sy;
            connection.desX = dx;
            connection.desY = dy;
        });

        return model;
    }

    getOffsetToClient(){
        var clientPosition = this._mainElement.getBoundingClientRect();
        return {x: clientPosition.left, y: clientPosition.top}
    }

    render(){

        if(this.state==null){
            return ( <div className="max"></div> )
        }

        var mouseDown = function(selected){

            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: selected})
        }.bind(this);

        var mouseDownonSlot = function(data){
            console.log("Scenario: mouse down on slot: "+JSON.stringify(data))
        }.bind(this);

        var mouseMove = function(event){

            var nx = this.state.selected.dx+event.clientX-this.state.selected.cdx;
            var ny = this.state.selected.dy+event.clientY-this.state.selected.cdy;

            var node = this.state.nodesMap[this.state.selected.name]
            node.x=nx;
            node.y=ny;

            this.setState(this.updateInternalModel(this.state));

        }.bind(this);

        var mouseLeave = function(){
            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: null})
        }.bind(this);

        var mouseUp = function(){
            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: null})
        }.bind(this);


        var nodes = this.state.nodes.map(n => <Node key={n.name} model={n} onMouseDown={mouseDown} onMouseDownOnSlot={mouseDownonSlot}/>);
        var connections = this.state.connections.map(c => <Connection key={c.src+c.des+c.index} model={c}/>);

        const { isOver, canDrop, connectDropTarget } = this.props;

        if(this.state.selected){
            return connectDropTarget(
                <div className="max" ref={(el) => this._mainElement = el} onMouseMove={mouseMove} onMouseLeave={mouseLeave} onMouseUp={mouseUp}>
                    <div>
                        {connections}
                        {nodes}
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
