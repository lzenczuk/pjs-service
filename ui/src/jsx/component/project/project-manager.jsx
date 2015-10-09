import React from 'react';
import ProjectList from './projects-list';

export default
class ProjectManager extends React.Component {

    constructor(props) {
        super(props);
        console.log("ProjectManager:componentWillMount}");
        // state and default properties goes here
    }

    componentWillMount() {
        console.log("ProjectManager: componentWillMount")
    }

    componentDidMount() {
        console.log("ProjectManager: componentDidMount")
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("ProjectManager: componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("ProjectManager: shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("ProjectManager: componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("ProjectManager: componentDidUpdate")
    }

    render() {
        console.log("ProjectManager: render");

        return (
            <div className="max">
                <ProjectList />
            </div>
        )
    }
}