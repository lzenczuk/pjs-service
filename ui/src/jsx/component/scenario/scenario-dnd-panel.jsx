import React from 'react';

export default
class ScenarioDndPanel extends React.Component {

    constructor(props) {
        super(props);
        console.log("ScenarioDndPanel:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ScenarioDndPanel: componentWillMount")
    }

    componentDidMount() {
        console.log("ScenarioDndPanel: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ScenarioDndPanel: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ScenarioDndPanel: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ScenarioDndPanel: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ScenarioDndPanel: componentDidUpdate")
    }

    render() {
        console.log("ScenarioDndPanel: render");

        return (
            <div>Hello</div>
        )
    }
}