export default class ScenariosDO {

    constructor() {
        this.reset()
    }

    loadingScenarios(){
        this._loading=true;
        this._error=false;
        this._errorMsg='';
        this._scenarios=[]
    }

    loadingScenariosError(msg){
        this._loading=false;
        this._error=true;
        this._errorMsg=msg;
        this._scenarios=[]
    }

    scenariosLoaded(scenarios){
        this._loading=false;
        this._error=false;
        this._errorMsg='';
        this._scenarios=scenarios
    }

    isLoading(){
        return this._loading
    }

    isError(){
        return this._error
    }

    get errorMessage(){
        return this._errorMsg
    }

    get scenarios(){
        return this._scenarios
    }

    reset(){
        this._loading = false;
        this._error = false;
        this._errorMsg = '';
        this._scenarios = []
    }
}