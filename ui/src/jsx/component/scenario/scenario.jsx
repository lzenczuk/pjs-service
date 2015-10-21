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
                var connection = {src: node.name, des: s.nodeName, srcX: 0, srcY: 0, desX: 0, desY: 0, index: index};
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
        })

        model.connections.forEach(connection => {
            var src = model.nodesMap[connection.src];
            var des = model.nodesMap[connection.des];

            var sx = src.x+connection.index*Scenario._slotWidth()+(Scenario._slotWidth()/2);
            var sy = src.y+Scenario._nodeHeight();

            var dx = (des.x+des.uiWidth/2);
            var dy = des.y;

            connection.srcX = sx;
            connection.srcY = sy;
            connection.desX = dx;
            connection.desY = dy;
        })

        return model;
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
