export default class ProjectsDO {

    constructor() {
        this.reset()
    }

    loadingProjects(){
        this._loading=true;
        this._error=false;
        this._errorMsg='';
        this._projects=[]
    }

    loadingProjectsError(msg){
        this._loading=false;
        this._error=true;
        this._errorMsg=msg;
        this._projects=[]
    }

    projectsLoaded(projects){
        this._loading=false;
        this._error=false;
        this._errorMsg='';
        this._projects=projects
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

    get projects(){
        return this._projects
    }

    reset(){
        this._loading = false;
        this._error = false;
        this._errorMsg = '';
        this._projects = []
    }
}