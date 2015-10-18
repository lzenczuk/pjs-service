import React from 'react';
import Node from './node'

export default class Scenario extends React.Component {

    render(){

        console.log("====> rendering scenario");

        if(this.props==null || this.props.model==null){
            return ( <div className="max"></div> )
        }

        var nodes = [];

        if(typeof this.props.model.nodesMap !== 'undefined') {
            nodes = Object.keys(this.props.model.nodesMap).map(nodeName =>
                <Node key={nodeName} model={this.props.model.nodesMap[nodeName]}/>);
        }

        return(
            <div className="max">
                {nodes}
            </div>
        )
    }
}
