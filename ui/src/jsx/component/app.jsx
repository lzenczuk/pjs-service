import React from 'react';
import TopBar from './app/top-bar'
import ProjectManager from './project/project-manager'

import ctx from '../context';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        console.log("componentWillMount");

        this.projectActions = ctx.projectActions;

        this.state={activeView: 'projects'}
    }

    componentWillMount() {
        console.log("componentWillMount")
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.projectActions.loadProjects();
    }

    /**
     * @param nextProps - object
     */
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");

        // if(nextProps.likeCount > this.props.likeCount)...
        // calling setState here not cause additional render, just one
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return true;
    }

    /**
     * @param nextProps - object
     * @param nextState - object
     */
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate");
        // can't call setState here
    }

    /**
     * @param prevProps - object
     * @param prevState - object
     */
    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate")
    }

    render() {
        console.log("render");

        var content = (<div className="tmp">Test</div>);

        if(this.state.activeView=='projects'){
            content = (<ProjectManager />)
        }

        return (
            <div className="app">
                <div className="top-container">
                    <div>
                        <TopBar />
                    </div>
                </div>
                <div className="bottom-container">
                    <div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
