import React from 'react';
import ctx from '../../../context';

export default class ScriptSlotForm extends React.Component {

    render(){

        let slotModel = this.props.slotModel;

        return (
            <div>
                <div>Script slot</div>
                <input className="name-form" type="text" value={slotModel.label} />
                <textarea className="script-form" value={slotModel.script} />
                <div>{slotModel.desNodeId}</div>
                <hr/>
            </div>
        )
    }
}

