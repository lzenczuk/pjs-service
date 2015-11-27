import React from 'react';
import Node from './node';
import Connection from './connection';
import ScenarioLowLevelEvent from '../scenario-low-level-event'

export default class ScenarioGraph extends React.Component {

    render(){


        var nodes = this.props.model.nodes.map(node => {
            return (<Node key={node.name+'_'+node.id}
                  ref={node.id}
                  model={node}
                  onMouseEvent={this.props.onMouseEvent}
            />)
        });

        var connections = this.props.model.connections.map(c => {
            return (<Connection key={c.src+'_'+c.des+'_'+c.index} model={c} onMouseEvent={this.props.onMouseEvent}/>)
        });

        return (
        	<div>
        		{connections}
        		{nodes}
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
                    this.props.onMouseEvent(ScenarioLowLevelEvent.scenarioSizeEvent(changes))
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
                    this.props.onMouseEvent(ScenarioLowLevelEvent.scenarioSizeEvent(changes))
                }
            }.bind(this), 0)

        }
    }
}

ScenarioGraph.propertyTypes = {
	model: React.PropTypes.object.isRequired,
    onMouseEvent: React.PropTypes.func
};


