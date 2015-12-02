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
            	<NewNodeDndButton type="script_node" text="Script node"/>
            	<NewNodeDndButton type="get_page_node" text="Get page node"/>
                <button type="button" onClick={this.onScenarioSave.bind(this)}>Save</button>
            </div>
        )
    }
}