import ActionTypes from './action-types';

export default class ScenarioActions{

    constructor(dispatcher, server){
        this._dispatcher = dispatcher;
        this._server = server
    }

    selectScenario(scenario){
        this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoading});
        this._dispatcher.dispatch({actionType: ActionTypes.scenarioSelected});

        this._server.GET('/api/scenario',
            (response => {
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoaded, scenario: response})
            }).bind(this),
            ((code, message) => {
                console.error("------------> error: "+code);
                this._dispatcher.dispatch({actionType: ActionTypes.scenarioLoadingError, message: message})
            }).bind(this))
    }
}
