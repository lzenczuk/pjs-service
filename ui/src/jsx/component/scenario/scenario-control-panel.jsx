import React from 'react';

import NewNodeDndButton from './new-node-dnd-button';

export default
class ScenarioControlPanel extends React.Component {

    render() {
        console.log("ScenarioDndPanel: render");

        return (
            <div>
            	Hello
            	<NewNodeDndButton />
            </div>
        )
    }
}