import EventEmitter from 'events'

import ActionTypes from '../action/action-types'

export default class ProjectStore extends EventEmitter {

    constructor(dispatcher){
        super();
        this.dispatcher = dispatcher;

        this._projects = {loading: false, error: false, projects: []};

        this.dispatcher.register( action => {
            console.log("ProjectStore action: "+JSON.stringify(action))

            if(action.actionType==ActionTypes.loadingProjects){
                this._projects.loading=true;
                this._projects.error=false;
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.projectsLoaded){
                this._projects.loading=false;
                this._projects.error=false;
                this._projects.projects = action.projects;
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.projectsLoadingError){
                this._projects.loading=false;
                this._projects.error=true;
                this.emit('CHANGE');
            }
        })
    }

    get projects(){
        return this._projects
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }
}