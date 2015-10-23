import React from 'react';

import Scenario from './scenario'
import ScenarioControlPanel from './scenario-control-panel'

import ctx from '../../context';

export default
class ScenarioView extends React.Component {

    constructor(props) {
        super(props);

        this.scenarioActions = ctx.scenarioActions;
        this.scenarioStore = ctx.scenarioStore;

        this.scenarioStoreCallback = function(){
            this.setState(this.scenarioStore.model);
        }.bind(this);
    }

    componentDidMount() {
        this.scenarioStore.addChangeListener(this.scenarioStoreCallback);
    }

    componentWillUnmount(){
        this.scenarioStore.removeChangeListener(this.scenarioStoreCallback)
    }

    render() {

        if(this.state == null || this.state.status == null) return (<div className="max"></div>);

        if(this.state.status.error){
            return (<div className="max">Error: {this.state.status.errorMsg}</div>)
        }

        if(this.state.status.loading){
            return (<div className="max">Loading...</div>)
        }

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        <div className="max-width top-bar-height no-scrollbars bottom-edge">
                            <div>
                                <ScenarioControlPanel />
                            </div>
                        </div>
                        <div className="max top-bar-margin scrollbars">
                            <div>
                                <Scenario model={this.state.scenario} />
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div className="scenario-right-panel">
                    <div>
                        Right scenario
                    </div>
                </div>
            </div>
        )
    }
}
