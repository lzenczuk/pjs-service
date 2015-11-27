import React from 'react';
import ctx from '../../../context';

export default class ScriptSlotForm extends React.Component {

    onLabelChange(event) {
        ctx.scenarioActions.changeSlotLabel(this.props.nodeId, this.props.index, event.target.value);
    }

    render(){

        let slotModel = this.props.slotModel;

        return (
            <div>
                <div>Script slot</div>
                <input className="name-form" type="text" value={slotModel.label} onChange={this.onLabelChange.bind(this)}/>
                <textarea className="script-form" value={slotModel.script} />
                <div>{slotModel.desNodeId}</div>
                <hr/>
            </div>
        )
    }
}

