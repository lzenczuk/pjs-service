import React from 'react';

import Scenario from './scenario'

import ctx from '../../context';

export default
class ScenarioView extends React.Component {

    constructor(props) {
        super(props);
        console.log("ScenarioView:componentWillMount}");
        // state and default properties goes here

        this.scenarioActions = ctx.scenarioActions;
        this.scenarioStore = ctx.scenarioStore;

        this.scenarioStoreCallback = function(){
            this.setState(this.scenarioStore.model);
        }.bind(this);
    }

    componentWillMount() {
        console.log("ScenarioView: componentWillMount")
    }

    componentDidMount() {
        console.log("ScenarioView: componentDidMount");

        this.scenarioStore.addChangeListener(this.scenarioStoreCallback);
    }

    componentWillUnmount(){
        console.log("ScenarioView: componentWillUnmount");
        this.scenarioStore.removeChangeListener(this.scenarioStoreCallback)
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ScenarioView: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ScenarioView: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ScenarioView: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ScenarioView: componentDidUpdate")
    }

    render() {
        console.log("ScenarioView: render");

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
                        <Scenario model={this.state.scenario} />
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
