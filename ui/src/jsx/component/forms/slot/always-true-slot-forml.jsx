import React from 'react';
import ctx from '../../../context';

export default class AlwaysTrueSlotForm extends React.Component {

    onLabelChange(event) {
        ctx.scenarioActions.changeSlotLabel(this.props.nodeId, this.props.index, event.target.value);
    }

    onDestroySlotClick(){
        ctx.scenarioActions.destroySlot(this.props.nodeId, this.props.index);
    }

    onMoveUpSlotClick(){
        ctx.scenarioActions.moveUpSlot(this.props.nodeId, this.props.index);
    }

    onMoveDownClick(){
        ctx.scenarioActions.moveDownSlot(this.props.nodeId, this.props.index);
    }

    render(){

        let slotModel = this.props.slotModel;

        return (
            <div>
                <div>Always true
                    <span className="destroy-slot-button" onClick={this.onDestroySlotClick.bind(this)}>x</span>
                    <span className="move-slot-button" onClick={this.onMoveUpSlotClick.bind(this)}>^</span>
                    <span className="move-slot-button" onClick={this.onMoveDownClick.bind(this)}>v</span>
                </div>
                <input className="name-form" type="text" value={slotModel.label} onChange={this.onLabelChange.bind(this)}/>
                <div>{slotModel.desNodeId}</div>
                <hr/>
            </div>
        )
    }
}

