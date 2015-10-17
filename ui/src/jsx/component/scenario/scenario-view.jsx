import React from 'react';

export default
class ScenarioView extends React.Component {

    constructor(props) {
        super(props);
        console.log("ScenarioView:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ScenarioView: componentWillMount")
    }

    componentDidMount() {
        console.log("ScenarioView: componentDidMount")
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

        return (
            <div className="max">
                <div className="scenario-left-panel">
                    <div>
                        Left scenario
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