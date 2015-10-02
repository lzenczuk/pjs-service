import React from 'react';
import Node from './node'

export default class Scenario extends React.Component {
    render(){

        var nodes = [];

        if(typeof this.props.model.nodesMap !== 'undefined') {
            nodes = Object.keys(this.props.model.nodesMap).map(nodeName =>
                <Node key={nodeName} model={this.props.model.nodesMap[nodeName]}/>);
        }

        return(
            <div className="vertical-horizontal-max top-space-50">
                {nodes}
            </div>
        )
    }
}
