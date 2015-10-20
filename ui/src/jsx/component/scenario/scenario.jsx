import React from 'react';
import Node from './node'
import Connection from './connection'

export default class Scenario extends React.Component {

    constructor(props){
        super(props);

        if(props!=null){
            this.state = this.convertToInternalModel(props.model)
        }
    }

    componentWillReceiveProps(nextProps){

        if(nextProps!=null){
            this.setState(this.convertToInternalModel(nextProps.model))
        }
    }

    convertToInternalModel(model){

        var nodes = []
        var nameToNodeMap = {}
        var connections = []

        Object.keys(model.nodesMap).forEach(nodeName => {
            var node = model.nodesMap[nodeName];
            var slots = node.slots.slots;

            nodes.push(node);
            nameToNodeMap[node.name] = node

            if(slots.length<=3){
                node.uiWidth=210;
            }else{
                node.uiWidth=70*slots.length;
            }

            slots.forEach((s, index) => {

                var sx = node.x+index*70+35
                var sy = node.y+75

                connections.push({src: node.name, des: s.nodeName, srcX: sx, srcY: sy, desX: 0, desY: 0})
            })
        })

        connections.forEach( c => {
            var node = nameToNodeMap[c.des];

            c.desX = (node.x+node.uiWidth/2);
            c.desY = node.y;
        });

        return {
            nodes: nodes,
            connections: connections
        };
    }

    render(){

        if(this.state==null){
            return ( <div className="max"></div> )
        }

        var nodes = this.state.nodes.map(n => <Node key={n.name} model={n}/>);
        var connections = this.state.connections.map(c => <Connection key={c.src+c.des} model={c}/>);

        return(
            <div className="max">
                {nodes}
                {connections}
            </div>
        )
    }
}
