import EventEmitter from 'events';

import ProjectsDO from './do/projects-do';
import ScenariosDO from './do/scenarios-do';

import ActionTypes from '../action/action-types';

export default class ProjectStore extends EventEmitter {

    constructor(dispatcher){
        super();
        this.dispatcher = dispatcher;

        this._projects = new ProjectsDO();
        this._selectedProject = null;
        this._scenarios = new ScenariosDO();

        this.dispatcher.register( action => {
            console.log("ProjectStore action: "+JSON.stringify(action));

            if(action.actionType==ActionTypes.loadingProjects){
                this._projects.loadingProjects();
                this._selectedProject = null;
                this._scenarios.reset();
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.projectsLoaded){
                this._projects.projectsLoaded(action.projects);
                this._selectedProject = null;
                this._scenarios.reset();
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.projectsLoadingError){
                this._projects.loadingProjectsError(action.message);
                this._selectedProject=null;
                this._scenarios.reset();
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.projectSelected){
                this._selectedProject = action.project;
                this._scenarios.loadingScenarios();
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.scenariosLoaded){
                this._scenarios.scenariosLoaded(action.scenarios);
                this.emit('CHANGE');
            }else if(action.actionType==ActionTypes.scenariosLoadingError){
                this._scenarios.loadingScenariosError(action.message);
                this.emit('CHANGE');
            }
        })
    }

    get projects(){
        return this._projects
    }

    get selectedProject(){
        return this._selectedProject
    }

    get scenarios(){
        return this._scenarios
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }

    removeChangeListener(callback){
        this.removeListener('CHANGE', callback)
    }
}
