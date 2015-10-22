import React from 'react';

export default class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>Panel: {this.props.marginTop} {this.props.marginBottom}</div>
        )
    }
}