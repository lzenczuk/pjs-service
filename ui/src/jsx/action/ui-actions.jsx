import ActionTypes from './action-types';

export default class UIActions{

    constructor(dispatcher, server){
        this._dispatcher = dispatcher;
        this._server = server
    }

    initUi(){
        this._dispatcher.dispatch({actionType: ActionTypes.initUi})
    }

    goToProjects(){
        this._dispatcher.dispatch({actionType: ActionTypes.goToProjects})
    }

    //goToProjects
}