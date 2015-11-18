import React from 'react';

import ctx from '../../../context';

export default class ScenariosList extends React.Component {

    constructor(props) {
        super(props);

        this.scenarioActions = ctx.scenarioActions
    }

    render() {

        var scenarios = this.props.scenarios;
        if(scenarios==null) return;

        if(scenarios.isError()){

            var reload = function(){
                this.scenarioActions.loadScenarios()
            }.bind(this);

            return(<div>loading error {scenarios.errorMessage}<a href="#" onClick={reload}>reload</a></div>)
        }else if(scenarios.isLoading()){
            return(<div>loading...</div>)
        }else{
            var pl = scenarios.scenarios.map(((s, i) => {
                var clickHandler = function(){
                    this.scenarioActions.selectScenario(s)
                }.bind(this);

                return (<li key={i} onClick={clickHandler}>{s.name} <i>{s.description}</i></li>)
            }).bind(this));

            return (<ul className="ui-list">{pl}</ul>)
        }
    }
}
