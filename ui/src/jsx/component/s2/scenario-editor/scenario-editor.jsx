import React from 'react';
import ScenarioEvent from '../scenario-event'
import ConnectionLine from './connection-line'
import SelectedNode from './selected-node'

export default class ScenarioEditor extends React.Component {

    render(){

        var connectionLine;
        if(this.props.connectionLine!=null){
            connectionLine = <ConnectionLine model={this.props.connectionLine} />
        }

        let selectedNodes = Object.keys(this.props.selectedNodes)
            .map(nodeName => this.props.model.getNodeByName(nodeName))
            .map(node => <SelectedNode key={node.name} model={node}/>);

        return (
            <div>
                {connectionLine}
                {selectedNodes}
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


