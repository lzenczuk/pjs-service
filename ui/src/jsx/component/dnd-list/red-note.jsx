import React from 'react';

export default class RedNote extends React.Component {


    render() {

        return (
            <div className="red-note">
                <span className="title">{this.props.title}</span>
                <p>{this.props.text}</p>
            </div>
        )
    }
}

RedNote.propertyTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string
};
