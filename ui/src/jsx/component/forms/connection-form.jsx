import React from 'react';

export default class ConnectionForm extends React.Component {

    render(){

        let connectionModel = this.props.connectionModel;
        let scenarioModel = this.props.scenarioModel;

        return (
            <div>
                <h3>Connection</h3>
                <div>Start node</div>
                <div>{scenarioModel.getNodeById(connectionModel.src).name}</div>
                <div>End node</div>
                <div>{scenarioModel.getNodeById(connectionModel.des).name}</div>

            </div>
        )
    }
}

