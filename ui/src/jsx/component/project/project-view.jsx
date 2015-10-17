import React from 'react';
import ProjectList from './projects-list';
import Project from './project';

import ctx from '../../context';

export default
class ProjectView extends React.Component {

    constructor(props) {
        super(props);
        console.log("ProjectView:componentWillMount}");
        // state and default properties goes here

        this.projectActions = ctx.projectActions;
        this.projectStore = ctx.projectStore;

        ctx.projectStore.addChangeListener((() => {
            this.setState({
                projects: this.projectStore.projects,
                selectedProject: this.projectStore.selectedProject,
                scenarios: this.projectStore.scenarios
            });
        }).bind(this));
    }

    componentWillMount() {
        console.log("ProjectView: componentWillMount")
    }

    componentDidMount() {
        console.log("ProjectView: componentDidMount");
        this.projectActions.loadProjects()
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ProjectView: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectView: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ProjectView: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ProjectView: componentDidUpdate")
    }

    render() {
        console.log("ProjectView: render");

        if(this.state==null){
            return (
                <div className="max">loading...</div>
            )
        }


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