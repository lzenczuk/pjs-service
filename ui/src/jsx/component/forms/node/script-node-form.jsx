import React from 'react';
import ctx from '../../../context';

export default class ScriptNodeForm extends React.Component {

    onNameChange(event) {
        console.log("change: "+event.target.value);
        ctx.scenarioActions.renameNode(this.props.nodeModel.id, event.target.value);
    }

    render(){

        let nodeModel = this.props.nodeModel;

        return (
            <div>
                <h3>Script node</h3>
                <div>Name</div>
                <input type="text" value={nodeModel.name} onChange={this.onNameChange.bind(this)}/>
                <div>Description</div>
                <div>{nodeModel.description}</div>
            </div>
        )
    }
}