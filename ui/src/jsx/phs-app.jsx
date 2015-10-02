import React from 'react';
import jQuery from 'jquery';
import Scenario from './scenario';

export default class PhsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {model: {}};
    }

    loadHandler() {
        console.log("load");
        jQuery.getJSON("/api/scenario", function(data){
            console.log("load -----> "+JSON.stringify(data));
            this.setState({model: data})
        }.bind(this))
    }

    saveHandler() {
        console.log("save");
        jQuery.ajax(
            {
                type: 'POST',
                url: "/api/scenario",
                contentType: 'application/json',
                'data': JSON.stringify(this.state.model),
                'dataType': 'json',
                success: function(data){
                    console.log("save -----> "+data);
                }.bind(this)
            }
        )
    }

    render(){
        return(
            <div className="vertical-horizontal-max">
                    <a href="#" onClick={this.loadHandler.bind(this)}>load</a>
                    <a href="#" onClick={this.saveHandler.bind(this)}>save</a>
                    <Scenario model={this.state.model}/>
            </div>
        )
    }
}
