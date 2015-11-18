import React from 'react';
import ProjectList from './projects-list';
import Project from './project';

import ctx from '../../../context';

export default
class ProjectView extends React.Component {

    constructor(props) {
        super(props);

        this.projectActions = ctx.projectActions;
        this.projectStore = ctx.projectStore;

        this.projectStoreCallback = function(){
            this.setState({
                projects: this.projectStore.projects,
                selectedProject: this.projectStore.selectedProject,
                scenarios: this.projectStore.scenarios
            });
        }.bind(this);

        this.projectStore.addChangeListener(this.projectStoreCallback);
    }

    componentDidMount() {
        this.projectActions.loadProjects()
    }

    componentWillUnmount(){
        this.projectStore.removeChangeListener(this.projectStoreCallback)
    }

    render() {

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