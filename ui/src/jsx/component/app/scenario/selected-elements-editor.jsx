import React from 'react';
import ScenarioForm from '../../forms/scenario-form';
import ConnectionForm from '../../forms/connection-form';
import ScriptNodeForm from '../../forms/node/script-node-form';

export default class SelectedElementsEditor extends React.Component{

    render(){

        let editor = this.props.editorModel;
        let numberOfSelectedElements = editor.numberOfSelectedElements();

        var form;

        if(numberOfSelectedElements==0){
            form = (<ScenarioForm scenarioModel={this.props.scenarioModel} />)
        }else if(numberOfSelectedElements == 1){

            if(editor.isSingleNodeSelected()){
                form = (<ScriptNodeForm nodeModel={editor.getSelectedNode(0)} />)
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