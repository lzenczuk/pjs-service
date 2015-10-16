import React from 'react';
import ProjectList from './projects-list';
import Project from './project';

import ctx from '../../context';

export default
class ProjectManager extends React.Component {

    constructor(props) {
        super(props);
        console.log("ProjectManager:componentWillMount}");
        // state and default properties goes here

        this.projectStore = ctx.projectStore;

        ctx.projectStore.addChangeListener((() => {
            this.setState({
                projects: this.projectStore.projects,
                selectedProject: this.projectStore.selectedProject,
                scenarios: this.projectStore.scenarios
            });
        }).bind(this));

        this.state = {
            projects: this.projectStore.projects,
            selectedProject: this.projectStore.selectedProject,
            scenarios: this.projectStore.scenarios
        }
    }

    componentWillMount() {
        console.log("ProjectManager: componentWillMount")
    }

    componentDidMount() {
        console.log("ProjectManager: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ProjectManager: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectManager: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ProjectManager: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ProjectManager: componentDidUpdate")
    }

    render() {
        console.log("ProjectManager: render");

        var onProjectSelect = function(project){
            ctx.projectActions.selectProject(project)
        }.bind(this);

        return (
            <div className="max">
                <div className="projects-left-panel">
                    <div>
                        <ProjectList projects={this.state.projects} onSelect={onProjectSelect}/>
                    </div>
                </div>

                <div className="projects-right-panel">
                    <div>
                        <Project project={this.state.selectedProject} scenarios={this.projectStore.scenarios}/>
                    </div>
                </div>
            </div>
        )
    }
}