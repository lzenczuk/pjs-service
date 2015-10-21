import React from 'react';
import Node from './node'
import Connection from './connection'

export default class Scenario extends React.Component {

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

        if(props!=null){
            var model = this.convertToInternalModel(props.model);
            this.state = {nodes: model.nodes, nodesMap: model.nodesMap, connections: model.connections, selected: null}
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps!=null){
            var model = this.convertToInternalModel(nextProps.model);
            var s = this.state;
            this.setState({nodes: model.nodes, nodesMap: model.nodesMap, connections: model.connections, selected: s.selected})
        }
    }

    convertToInternalModel(model){

        var nodes = [];
        var nameToNodeMap = {};
        var connections = [];

        Object.keys(model.nodesMap).forEach(nodeName => {
            var node = model.nodesMap[nodeName];
            var slots = node.slots.slots;

            nodes.push(node);
            nameToNodeMap[node.name] = node;

            if(slots.length<=3){
                node.uiWidth=Scenario._slotWidth()*3;
            }else{
                node.uiWidth=Scenario._slotWidth()*slots.length;
            }

            slots.forEach((s, index) => {

                var sx = node.x+index*Scenario._slotWidth()+(Scenario._slotWidth()/2);
                var sy = node.y+Scenario._nodeHeight();

                connections.push({src: node.name, des: s.nodeName, srcX: sx, srcY: sy, desX: 0, desY: 0})
            })
        });

        connections.forEach( c => {
            var node = nameToNodeMap[c.des];

            c.desX = (node.x+node.uiWidth/2);
            c.desY = node.y;
        });

        return {
            nodes: nodes,
            nodesMap: nameToNodeMap,
            connections: connections
        };
    }

    render(){

        if(this.state==null){
            return ( <div className="max"></div> )
        }

        var mouseDown = function(selected){

            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: selected})
        }.bind(this);

        var mouseMove = function(event){

            var nx = this.state.selected.dx+event.clientX-this.state.selected.cdx;
            var ny = this.state.selected.dy+event.clientY-this.state.selected.cdy;

            var node = this.state.nodesMap[this.state.selected.name]
            node.x=nx;
            node.y=ny;

            this.setState(this.state);

        }.bind(this);

        var mouseLeave = function(){
            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: null})
        }.bind(this);

        var mouseUp = function(){
            var s = this.state;
            this.setState({nodes: s.nodes, nodesMap: s.nodesMap, connections: s.connections, selected: null})
        }.bind(this);

        var nodes = this.state.nodes.map(n => <Node key={n.name} model={n} onMouseDown={mouseDown} />);
        var connections = this.state.connections.map(c => <Connection key={c.src+c.des} model={c}/>);

        if(this.state.selected){
            return(
                <div className="max" onMouseMove={mouseMove} onMouseLeave={mouseLeave} onMouseUp={mouseUp}>
                    <div>
                        {connections}
                        {nodes}
                    </div>
                </div>
            )
        }

        return(
            <div className="max">
                <div>
                    {connections}
                    {nodes}
                </div>
            </div>
        )
    }
}
