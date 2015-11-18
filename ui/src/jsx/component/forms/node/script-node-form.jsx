import React from 'react';

export default class ScriptNodeForm extends React.Component {

    render(){

        let nodeModel = this.props.nodeModel;

        return (
            <div>
                <h3>Script node</h3>
                <div>Name</div>
                <div>{nodeModel.name}</div>
                <div>Description</div>
                <div>{nodeModel.description}</div>
            </div>
        )
    }
}