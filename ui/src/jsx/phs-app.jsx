import React from 'react';
import jQuery from 'jquery';
import Scenario from './scenario';

export default class PhsApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {model: {}};
    }

    loadHandler() {
        console.log("load")
        jQuery.getJSON("/api/scenario", function(data){
            console.log("-----> "+JSON.stringify(data));
            this.setState({model: data})
        }.bind(this))
    }

    render(){
        return(
            <div className="vertical-horizontal-max">
                    <a href="#" onClick={this.loadHandler.bind(this)}>load</a>
                    <Scenario model={this.state.model}/>
            </div>
        )
    }
}
