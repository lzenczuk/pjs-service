import React from 'react';

export default
class TopBar extends React.Component {

    constructor(props) {
        super(props);
        console.log("TopBar:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("TopBar: componentWillMount")
    }

    componentDidMount() {
        console.log("TopBar: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("TopBar: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("TopBar: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("TopBar: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("TopBar: componentDidUpdate")
    }

    render() {
        console.log("TopBar: render");

        return (
            <div className="topbar">Top bar</div>
        )
    }
}