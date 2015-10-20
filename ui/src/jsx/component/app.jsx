import React from 'react';
import TopBar from './app/top-bar'
import ProjectView from './project/project-view'
import ScenarioView from './scenario/scenario-view'

import ctx from '../context';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    
        this.uiActions = ctx.uiActions;
        this.uiStore = ctx.uiStore;

        this.uiStore.addChangeListener((() => {
            this.setState(
                this.uiStore.model
            );
        }).bind(this));
    }

    componentDidMount() {
        this.uiActions.initUi();
    }

    render() {

        var content = (<div className="tmp">loading...</div>);

        if(this.state!=null && this.state.activeView!=null) {

            if (this.state.activeView == 'projects') {
                content = (<ProjectView />)
            }

            if (this.state.activeView == 'scenario') {
                content = (<ScenarioView />)
            }
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

