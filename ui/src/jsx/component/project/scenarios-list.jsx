import React from 'react';

export default class ScenariosList extends React.Component {

    constructor(props) {
        super(props);
        console.log("ScenariosList:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ScenariosList: componentWillMount")
    }

    componentDidMount() {
        console.log("ScenariosList: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ScenariosList: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ScenariosList: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ScenariosList: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ScenariosList: componentDidUpdate")
    }

    render() {
        console.log("ScenariosList: render");

        var scenarios = this.props.scenarios;
        if(scenarios==null) return;

        if(scenarios.isError()){

            var reload = function(){
                ctx.scenarioActions.loadScenarios()
            };

            return(<div>loading error {scenarios.errorMessage}<a href="#" onClick={reload}>reload</a></div>)
        }else if(scenarios.isLoading()){
            return(<div>loading...</div>)
        }else{
            var pl = scenarios.scenarios.map((s, i) => {
                var clickHandler = function(){
                    ctx.scenarioActions.selectScenario(s)
                };

                return (<li key={i} onClick={clickHandler}>{s.name} <i>{s.description}</i></li>)
            });

            return (<ul className="ui-list">{pl}</ul>)
        }
    }
}
