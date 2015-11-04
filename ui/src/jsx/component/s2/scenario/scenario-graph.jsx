import React from 'react';
import Node from './node';
import Connection from './connection';
import ScenarioMouseEvent from './scenario-mouse-event'
import ConnectionLine from '../connection-line'

export default class ScenarioGraph extends React.Component {

    render(){

        var nodes = this.props.nodes.map(node =>
            <Node key={node.name}
                  name={node.name}
                  description={node.description}
                  x={node.x}
                  y={node.y}
                  slots={node.slots.slots}
                  onMouseEvent={this.props.onMouseEvent}
            />);

        var connections = this.props.connections.map(c => <Connection key={c.src+c.des+c.index} model={c}/>);

        var connectionLine;
        if(this.props.connectionLine!=null){
            connectionLine = <ConnectionLine model={this.props.connectionLine} />
        }

        return (
        	<div>
        		{connections}
        		{nodes}
                {connectionLine}
        	</div>)
    }
}

ScenarioGraph.propertyTypes = {
	nodes: React.PropTypes.array.isRequired,
	connections: React.PropTypes.array.isRequired,
    onMouseEvent: React.PropTypes.func,
    connectionLine: React.PropTypes.object
};


