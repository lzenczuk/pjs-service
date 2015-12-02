import React from 'react';
import ctx from '../../context';

export default class ScenarioForm extends React.Component {

    onStartNodeChange(event) {
        ctx.scenarioActions.changeScenarioStartNode(event.target.value);
    }

    render(){

        let scenarioModel = this.props.scenarioModel;

        var startNodes = [ (<option key="null" value="null">Not selected</option>) ];

        scenarioModel.nodes.forEach(node => {
            startNodes.push(<option key={node.id} value={node.id}>{node.name}</option>)
        });

        return (
            <div>
                <h3>Scenario</h3>
                <div>Start node</div>
                <select value={scenarioModel.startNodeId} onChange={this.onStartNodeChange.bind(this)}>
                    {startNodes}
                </select>
            </div>
        )
    }
}

