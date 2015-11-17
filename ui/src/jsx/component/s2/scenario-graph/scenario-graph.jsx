import React from 'react';
import Node from './node';
import Connection from './connection';
import ScenarioEvent from '../scenario-event'
import ConnectionLine from '../connection-line'

export default class ScenarioGraph extends React.Component {

    render(){


        var nodes = this.props.model.nodes.map(node => {
            return (<Node key={node.name}
                  ref={node.name}
                  name={node.name}
                  selected={this.props.selectedNodes[node.name]}
                  description={node.description}
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  contentHeight={node.contentHeight}
                  slots={node.slots.slots}
                  onMouseEvent={this.props.onMouseEvent}
            />)
        });

        var connections = this.props.model.connections.map(c => {
            var selected = this.props.selectedConnection==c.src+'_'+c.des+'_'+c.index;
            return (<Connection key={c.src+c.des+c.index} selected={selected} model={c} onMouseEvent={this.props.onMouseEvent}/>)
        });

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

    checkSize(){
        return Object.keys(this.refs)
            .map(refName => this.refs[refName])
            .filter(el => el.checkIsElementSizeCorrect)
            .map(node => node.checkIsElementSizeCorrect())
            .filter(e => e!=null);


    }

    componentDidMount(){
        // we need timer because we in dispatcher loop
        if(this.props.onMouseEvent!=null){
            window.setTimeout(function(){
                let changes = this.checkSize();
                if(changes!=null && changes.length!=0){
                    this.props.onMouseEvent(ScenarioEvent.scenarioSizeEvent(changes))
                }
            }.bind(this), 0)

        }
    }

    componentDidUpdate(){
        // we need timer because we in dispatcher loop
        if(this.props.onMouseEvent!=null){
            window.setTimeout(function(){
                let changes = this.checkSize();
                if(changes!=null && changes.length!=0){
                    this.props.onMouseEvent(ScenarioEvent.scenarioSizeEvent(changes))
                }
            }.bind(this), 0)

        }
    }
}

ScenarioGraph.propertyTypes = {
	model: React.PropTypes.object.isRequired,
    selectedNodes: React.PropTypes.array.isRequired,
    selectedConnection: React.PropTypes.string,
    onMouseEvent: React.PropTypes.func,
    connectionLine: React.PropTypes.object
};


