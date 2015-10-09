import ActionTypes from './action-types';
import rest from 'rest';
import mime from 'rest/interceptor/mime';
import errorCode from 'rest/interceptor/errorCode';

export default class ProjectActions{

    constructor(dispatcher){
        this.dispatcher = dispatcher
    }

    loadProjects(){
        this.dispatcher.dispatch({actionType: ActionTypes.loadingProjects});
        console.log("loading projects");

        var client = rest.wrap(mime).wrap(errorCode);
        client({path: '/api/projects'}).then(
            (response => {
                this.dispatcher.dispatch({actionType: ActionTypes.projectsLoaded, projects: response.entity})
            }).bind(this),
            (response => {
                console.error("------------> error: "+response.status.code);
                if(response.status.code==401){
                    this.dispatcher.dispatch({actionType: ActionTypes.errorUnauthorized})
                }

                this.dispatcher.dispatch({actionType: ActionTypes.projectsLoadingError})
            })
        );
    }
}
