import React from 'react';

export default
class NodeDetails extends React.Component {

    constructor(props) {
        super(props);
        console.log("NodeDetails:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("NodeDetails: componentWillMount")
    }

    componentDidMount() {
        console.log("NodeDetails: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("NodeDetails: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("NodeDetails: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("NodeDetails: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("NodeDetails: componentDidUpdate")
    }

    render() {
        console.log("NodeDetails: render");

        return (
            <div>Hello</div>
        )
    }
}