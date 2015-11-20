import React from 'react';

import NewNodeDndButton from './new-node-dnd-button';

export default
class ScenarioControlPanel extends React.Component {

    onScenarioSave(){
        if(this.props.onSaveScenario){
            this.props.onSaveScenario()
        }
    }

    render() {
        return (
            <div>
            	<NewNodeDndButton />
                <button type="button" onClick={this.onScenarioSave.bind(this)}>Save</button>
            </div>
        )
    }
}