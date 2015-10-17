import React from 'react';

export default
class ScenarioDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("ScenarioDetails:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ScenarioDetails: componentWillMount")
    }

    componentDidMount() {
        console.log("ScenarioDetails: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ScenarioDetails: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ScenarioDetails: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ScenarioDetails: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ScenarioDetails: componentDidUpdate")
    }

    render() {
        console.log("ScenarioDetails: render");

        return (
            <div>Hello</div>
        )
    }
}