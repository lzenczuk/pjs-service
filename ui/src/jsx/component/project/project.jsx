import React from 'react';

import ScenariosList from './scenarios-list';
import VPanel from './vpanel.jsx';
import Panel from './panel.jsx';

export default class Project extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if(this.state!=null){
            ctx.scenarioActions.loadScenarios(this.state.name)
        }
    }

    render() {
        var project = this.props.project;

        if (project == null) {
            return (
                <div>Select project</div>
            )
        } else {
            return (
                <div>
                    <h1>{project.name}</h1>

                    <VPanel>
                        <Panel height={10}></Panel>
                        <Panel height={20}></Panel>
                        <Panel></Panel>
                        <Panel height={11}></Panel>
                        <div>boom</div>
                    </VPanel>

                    <p>{project.description}</p>
                    <div className="inner-container">
                        <ScenariosList scenarios={this.props.scenarios} />
                    </div>
                </div>
            )
        }
    }
}
