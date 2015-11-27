import React from 'react';
import SlotsForm from '../slots-form';
import ctx from '../../../context';

export default class ScriptNodeForm extends React.Component {

    onNameChange(event) {
        ctx.scenarioActions.renameNode(this.props.nodeModel.id, event.target.value);
    }

    onDescriptionChange(event) {
        ctx.scenarioActions.changeNodeDescription(this.props.nodeModel.id, event.target.value);
    }

    onScriptChange(event) {
        ctx.scenarioActions.changeNodeScript(this.props.nodeModel.id, event.target.value);
    }

    render(){

        let nodeModel = this.props.nodeModel;

        return (
            <div>
                <h3>Script node</h3>
                <div>Name</div>
                <input className="name-form" type="text" value={nodeModel.name} onChange={this.onNameChange.bind(this)}/>
                <div>Description</div>
                <textarea className="description-form" value={nodeModel.description} onChange={this.onDescriptionChange.bind(this)}/>
                <div>Script</div>
                <textarea className="script-form" value={nodeModel.script} onChange={this.onScriptChange.bind(this)}/>
                <SlotsForm slotsModel={nodeModel.slots} nodeId={nodeModel.id}/>
            </div>
        )
    }
}
