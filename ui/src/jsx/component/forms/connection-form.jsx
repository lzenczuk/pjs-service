import React from 'react';

export default class ConnectionForm extends React.Component {

    render(){

        let connectionModel = this.props.connectionModel;

        return (
            <div>
                <h3>Connection</h3>
                <div>Start node</div>
                <div>{connectionModel.src}</div>
                <div>End node</div>
                <div>{connectionModel.des}</div>

            </div>
        )
    }
}

