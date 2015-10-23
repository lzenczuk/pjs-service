import React from 'react';

import ScenariosList from './scenarios-list';

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

                    <p>{project.description}</p>
                    <div className="inner-container">
                        <ScenariosList scenarios={this.props.scenarios} />
                    </div>
                </div>
            )
        }
    }
}
