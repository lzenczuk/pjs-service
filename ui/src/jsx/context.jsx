import {Dispatcher} from 'flux';

import ProjectActions from './action/project-actions'
import ProjectStore from './store/project-store'

import ScenarioActions from './action/scenario-actions'
import ScenarioStore from './store/scenario-store'

import UiActions from './action/ui-actions'
import UiStore from './store/ui-store'

import Server from './server'

class Context{

    /**
     * All flux based elements initialization
     */
    constructor(){
        this._dispatcher = new Dispatcher();
        this._server = new Server(this._dispatcher);

        this._projectActions = new ProjectActions(this._dispatcher, this._server);
        this._projectStore = new ProjectStore(this._dispatcher);

        this._scenarioActions = new ScenarioActions(this._dispatcher, this._server);
        this._scenarioStore = new ScenarioStore(this._dispatcher);

        this._uiActions = new UiActions(this._dispatcher, this._server);
        this._uiStore = new UiStore(this._dispatcher);
    }

    get projectActions(){
        return this._projectActions
    }

    get projectStore(){
        return this._projectStore
    }

    get scenarioActions(){
        return this._scenarioActions
    }

    get scenarioStore(){
        return this._scenarioStore
    }

    get uiActions(){
        return this._uiActions
    }

    get uiStore(){
        return this._uiStore
    }
}

export default new Context();
