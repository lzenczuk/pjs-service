import EventEmitter from 'events'
import NodeDispatcher from '../dispatcher/node-dispatcher'

let _instance = null;

export default class NodeStore extends EventEmitter{

    static instance(){
        if(_instance==null){
            _instance = new NodeStore();
        }

        return _instance;
    }

    constructor(){
        super();
        console.log("NodeStore.constructor");

        this.scenario = {"startNodeName":"randomNumberNode","nodesMap":{"lessThen50Node":{"class":"script_node","x":350,"y":100,"name":"lessThen50Node","description":"Number is smaller then 50. Terminate scenario.","script":"function main(input, ctx){ return ctx.msg+'less then 50'}","slots":{"slots":[]},"executorName":null},"moreThen50Node":{"class":"script_node","x":50,"y":100,"name":"moreThen50Node","description":"Number is bigger then 50. Generate new one.","script":"function main(input, ctx){ return ctx.msg+'more then 50'}","slots":{"slots":[{"class":"always_true_slot","nodeName":"randomNumberNode","label":null}]},"executorName":null},"randomNumberNode":{"class":"script_node","x":250,"y":10,"name":"randomNumberNode","description":"Generate random number between 0 and 100.","script":"function main(input, ctx){ ctx.msg='Random number: '; return Math.floor((Math.random()*100))}","slots":{"slots":[{"class":"script_slot","nodeName":"lessThen50Node","label":"<50","script":"function main(input, ctx){ return input < 50}"},{"class":"script_slot","nodeName":"moreThen50Node","label":">=50","script":"function main(input, ctx){ return input >= 50}"}]},"executorName":null}}}

        NodeDispatcher.instance().register((action) => {
                console.log("NodeStore.actionCallback: " + JSON.stringify(action))
                var name = ("xyz" + Math.random());
                var x = Math.random() * 600;
                var y = Math.random() * 500;

                this.scenario.nodesMap[name] = {
                    "class": "script_node",
                    "x": x,
                    "y": y,
                    "name": name,
                    "description": "Random node",
                    "script": "function main(input, ctx){ return 50'}",
                    "slots": {"slots": []},
                    "executorName": null
                };

                this.emit('CHANGE');
            }
        )
    }

    getScenario(){
        return this.scenario;
    }

    addChangeListener(callback){
        this.on('CHANGE', callback)
    }
}

