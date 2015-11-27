import React from 'react';
import ctx from '../../../context';

export default class AlwaysTrueSlotForm extends React.Component {

    onLabelChange(event) {
        ctx.scenarioActions.changeSlotLabel(this.props.nodeId, this.props.index, event.target.value);
    }

    render(){

        let slotModel = this.props.slotModel;

        return (
            <div>
                <div>Always true</div>
                <input className="name-form" type="text" value={slotModel.label} onChange={this.onLabelChange.bind(this)}/>
                <div>{slotModel.desNodeId}</div>
                <hr/>
            </div>
        )
    }
}

