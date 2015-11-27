import React from 'react';
import AlwaysTrueSlotForm from './slot/always-true-slot-forml';
import ScriptSlotForm from './slot/script-slot-forml';
import ctx from '../../context';
import ScriptSlotModel from '../../model/slot/script-slot'
import AlwaysTruSlotModel from '../../model/slot/always-true-slot'

export default class SlotsForm extends React.Component {

    constructor(props){
        super(props);
        this.state={newSlotComboVisible: false}
    }

    switchNewSlotComboVisibility(){
        this.setState({newSlotComboVisible: !this.state.newSlotComboVisible})
    }

    hideNewSlotComboVisibility(){
        this.setState({newSlotComboVisible: false})
    }

    addNewScriptSlot(){
        let slot = new ScriptSlotModel(null, null, null);
        ctx.scenarioActions.addSlot(this.props.nodeId, slot);
        this.hideNewSlotComboVisibility()
    }

    addNewAlwaysTrueSlot(){
        let slot = new AlwaysTruSlotModel(null, null);
        ctx.scenarioActions.addSlot(this.props.nodeId, slot);
        this.hideNewSlotComboVisibility()
    }

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

        var newSlotCombo;
        if(this.state.newSlotComboVisible){
            newSlotCombo = (
                <div className="slots-creation-combo-container">
                    <ul className="slots-creation-combo">
                        <li onClick={this.addNewAlwaysTrueSlot.bind(this)}>Always true slot</li>
                        <li onClick={this.addNewScriptSlot.bind(this)}>Script slot</li>
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <div>Slots<span className="add-slot-button" onClick={this.switchNewSlotComboVisibility.bind(this)}>+</span></div>
                {newSlotCombo}
                {slots}
            </div>
        )
    }
}

