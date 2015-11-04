import { Map, List } from 'immutable';

export default class ScriptNodeModel {

    static newScriptNodeModel(description, script){
        return new ScriptNodeModel(Map({description: description, script: script}))
    }

    constructor(scriptNodeModel){
        this._model = scriptNodeModel
    }

    updateDescription(description){
        return new ScriptNodeModel(this._model.set('description', description))
    }

    updateScript(script){
        return new ScriptNodeModel(this._model.set('script', script))
    }

    toString(){
        return "ScriptNodeModel {\nmodel: "+this._model+"\n}\n"
    }
}

