import React from 'react';
import ScenarioLowLevelEvent from '../scenario-low-level-event'
import ConnectionLine from './connection-line'
import SelectedNode from './selected-node'
import SelectedConnection from './selected-connection'

export default class ScenarioEditor extends React.Component {

    render(){

        var connectionLine;
        if(this.props.connectionLine!=null){
            connectionLine = <ConnectionLine model={this.props.connectionLine} />
        }

        var selectedConnections = this.props.model.connections.map(c => {
            if(this.props.selectedConnection==c.src+'_'+c.des+'_'+c.index) {
                return (<SelectedConnection key={c.src+c.des+c.index} model={c}/>)
            }
        });

        let selectedNodes = Object.keys(this.props.selectedNodes)
            .map(nodeName => this.props.model.getNodeByName(nodeName))
            .map(node => <SelectedNode key={node.name} model={node}/>);

        return (
            <div>
                {connectionLine}
                {selectedNodes}
                {selectedConnections}
            </div>)
    }
}

ScenarioEditor.propertyTypes = {
    model: React.PropTypes.object.isRequired,
    selectedNodes: React.PropTypes.array.isRequired,
    selectedConnection: React.PropTypes.string,
    onMouseEvent: React.PropTypes.func,
    connectionLine: React.PropTypes.object
};


