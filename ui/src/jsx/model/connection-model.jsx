import { Map, List } from 'immutable';

export default class ConnectionModel{

    // src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0

    static newConnectionModel(srcNodeName, desNodeName, srcX, srcY, desX, desY){
        return new ConnectionModel(Map({src: srcNodeName, des: desNodeName, srcX: srcX, srcY: srcY, desX: desX, desY: desY}))
    }

    constructor(connectionModel){
        this._model = connectionModel
    }

    toString(){
        return "ConnectionModel {\nmodel: "+this._model+"\n}\n"
    }
}
