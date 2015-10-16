import React from 'react';

import ScenariosList from './scenarios-list';

export default class Project extends React.Component {

    constructor(props) {
        super(props);
        console.log("Project:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("Project: componentWillMount")
    }

    componentDidMount() {
        console.log("Project: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("Project: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Project: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("Project: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("Project: componentDidUpdate")

        if(this.state!=null){
            ctx.scenarioActions.loadScenarios(this.state.name)
        }
    }

    render() {
        console.log("Project: render");

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
                    <ScenariosList scenarios={this.props.scenarios} />
                </div>
            )
        }
    }
}
