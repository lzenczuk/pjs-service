import React from 'react';
import ScenarioForm from '../../forms/scenario-form';
import ConnectionForm from '../../forms/connection-form';
import ScriptNodeForm from '../../forms/node/script-node-form';
import GetPageNodeForm from '../../forms/node/get-page-node-form';

export default class SelectedElementsEditor extends React.Component{

    render(){

        let editor = this.props.editorModel;
        let numberOfSelectedElements = editor.numberOfSelectedElements();

        var form;

        if(numberOfSelectedElements==0){
            form = (<ScenarioForm scenarioModel={this.props.scenarioModel} />)
        }else if(numberOfSelectedElements == 1){

            if(editor.isSingleNodeSelected()){
                let selectedNode = editor.getSelectedNode(0);

                switch(selectedNode.getServerClass()){
                    case "script_node": form = (<ScriptNodeForm nodeModel={selectedNode} />); break;
                    case "get_page_node": form = (<GetPageNodeForm nodeModel={selectedNode} />); break;
                    default : form = "Unknown node type: "+selectedNode.getServerClass();
                }
            }else if(editor.isConnectionSelected()){
                form = (<ConnectionForm scenarioModel={this.props.scenarioModel} connectionModel={editor.getSelectedConnection()} />)
            }else{
                form = "Unknown selected element"
            }

        }else if(numberOfSelectedElements > 1){
            form = "multiple selected elements"
        }

        return (
            <div>{form}</div>
        )
    }
}