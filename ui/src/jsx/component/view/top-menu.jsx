import React from 'react';
import DndButton from '../dnd/dnd-button'

function newNodeDragFunction(){

    var nodeModel = {
        "class": "script_node",
        "x": 0,
        "y": 0,
        "name": "New node",
        "description": "",
        "script": "function main(input, ctx){ return true'}",
        "slots": {"slots": []},
        "executorName": null
    };

    return {
        componentType: 'node',
        params: {
            model: nodeModel
        }
    }
}

export default class TopMenu extends React.Component {

    render(){
        return(
            <div className="menu">
                <DndButton onDrag={newNodeDragFunction} text="New node"/>
            </div>
        )
    }
}
