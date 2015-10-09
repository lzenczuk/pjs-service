import React from 'react';

export default
class Project extends React.Component {

    constructor(props) {
        super(props);
        console.log("Project:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("Project: componentWillMount")
    }

    componentDidMount() {
        console.log("Project: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("Project: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Project: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("Project: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("Project: componentDidUpdate")
    }

    render() {
        console.log("Project: render");

        return (
            <div>Hello</div>
        )
    }
}