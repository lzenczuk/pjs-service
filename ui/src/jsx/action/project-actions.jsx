import ActionTypes from './action-types';

export default class ProjectActions{

    constructor(dispatcher, server){
        this._dispatcher = dispatcher;
        this._server = server
    }

    loadProjects(){
        this._dispatcher.dispatch({actionType: ActionTypes.loadingProjects});
        console.log("loading projects");

        this._server.GET('/api/projects',
            (response => {
                this._dispatcher.dispatch({actionType: ActionTypes.projectsLoaded, projects: response})
            }).bind(this),
            ((code, message) => {
                console.error("------------> error: "+code);
                this._dispatcher.dispatch({actionType: ActionTypes.projectsLoadingError, message: message})
            }).bind(this))
    }

    selectProject(project){
        this._dispatcher.dispatch({actionType: ActionTypes.projectSelected, project: project})
    }
}
