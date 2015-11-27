import React from 'react';
import AlwaysTrueSlotForm from './slot/always-true-slot-forml';
import ScriptSlotForm from './slot/script-slot-forml';

export default class SlotsForm extends React.Component {

    render(){

        let slotsModel = this.props.slotsModel;
        let nodeId = this.props.nodeId;

        let slots = slotsModel.slots.map((slotModel, index) => {
            switch(slotModel.getServerClass()){
                case 'always_true_slot': return <AlwaysTrueSlotForm key={nodeId+'_'+index} slotModel={slotModel} nodeId={nodeId} index={index}/>;
                case 'script_slot': return <ScriptSlotForm key={nodeId+'_'+index} slotModel={slotModel} nodeId={nodeId} index={index}/>;
                default: return <div key={nodeId+'_'+index}>Unknown slot type: {slotModel.getServerClass()}</div>
            }
        });

        return (
            <div>
                <div>Slots</div>
                {slots}
            </div>
        )
    }
}

