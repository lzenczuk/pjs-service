import React from 'react';

export default class Scenario extends React.Component {
    render(){
        return(
            <div className="vertical-horizontal-max top-space-50">
                Scenario
                <div>{this.props.model.startNodeName}</div>
            </div>
        )
    }
}
