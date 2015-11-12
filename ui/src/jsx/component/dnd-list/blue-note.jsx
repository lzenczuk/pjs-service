import React from 'react';

export default class BlueNote extends React.Component {


    render() {

        return (
            <div className="blue-note">
                <span className="title">{this.props.title}</span>
                <p>{this.props.number}</p>
            </div>
        )
    }
}

BlueNote.propertyTypes = {
    title: React.PropTypes.string.isRequired,
    number: React.PropTypes.number,
};
