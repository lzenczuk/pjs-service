import React from 'react';

export default class ScenarioForm extends React.Component {

    render(){

        let scenarioModel = this.props.scenarioModel;

        return (
            <div>
                <h3>Scenario</h3>
                <div>Start node</div>
                <div>{scenarioModel.getNodeById(scenarioModel.startNodeId).name}</div>
            </div>
        )
    }
}

