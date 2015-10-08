import {Dispatcher} from 'flux';

import ProjectActions from './action/project-actions'
import ProjectStore from './store/project-store'

class Context{

    /**
     * All flux based elements initialization
     */
    constructor(){
        this._dispatcher = new Dispatcher();

        this._projectActions = new ProjectActions(this._dispatcher);
        this._projectStore = new ProjectStore(this._dispatcher);
    }

    get dispatcher(){
        return this._dispatcher
    }

    get projectActions(){
        return this._projectActions
    }

    get projectStore(){
        return this._projectStore
    }
}

export default new Context();
