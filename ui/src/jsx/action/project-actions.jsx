import ActionTypes from './action-types';
import rest from 'rest';
import mime from 'rest/interceptor/mime';

export default class ProjectActions{

    constructor(dispatcher){
        this.dispatcher = dispatcher
    }

    loadProjects(){
        this.dispatcher.dispatch({actionType: ActionTypes.loadingProjects});
        console.log("loading projects");

        var client = rest.wrap(mime);
        client({path: '/api/projects'}).then((response => {
            console.log(typeof(response.entity));
            this.dispatcher.dispatch({actionType: ActionTypes.projectsLoaded, projects: response.entity})
        }).bind(this));
    }
}
