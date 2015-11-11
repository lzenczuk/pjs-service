import ScriptNodeModel from './node/script-node-model';

export default class NodeModel {

    static fromServerModel(smodel) {
        switch(smodel.serverClass){
            case 'script_node': return ScriptNodeModel.fromServerModel(smodel);
            default: throw "Can't create node. Unknown serverClass: "+smodel.serverClass
        }
    }

    constructor(name, description, x, y, width, height, contentHeight) {
        this.name = name;
        this.description = description;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.contentHeight = contentHeight
    }

}