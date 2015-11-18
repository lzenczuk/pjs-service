export default class LoadingStatus {

    constructor() {
        this.reset()
    }

    loading(){
        this._loading=true;
        this._error=false;
        this._errorMsg='';
    }

    loadingError(msg){
        this._loading=false;
        this._error=true;
        this._errorMsg=msg;
    }

    loaded(){
        this._loading=false;
        this._error=false;
        this._errorMsg='';
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

    reset(){
        this._loading = false;
        this._error = false;
        this._errorMsg = '';
    }
}