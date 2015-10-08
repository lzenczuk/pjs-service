import ActionTypes from './action-types'

export default class ProjectActions{

    constructor(dispatcher){
        this.dispatcher = dispatcher
    }

    loadProjects(){
        this.dispatcher.dispatch({actionType: ActionTypes.loadingProjects});
        console.log("loading projects");
        window.setTimeout(function(){
            this.dispatcher.dispatch({actionType: ActionTypes.projectsLoaded, projects: ['project 1', 'project 2']})
        }.bind(this), 5000)
    }
}
