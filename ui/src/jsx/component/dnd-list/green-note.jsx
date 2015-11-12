import React from 'react';

export default class GreenNote extends React.Component {


    render() {

        return (
            <div className="green-note">
                <span className="title">{this.props.title}</span>
                <p>{this.props.date}</p>
            </div>
        )
    }
}

GreenNote.propertyTypes = {
    title: React.PropTypes.string.isRequired,
    date: React.PropTypes.string.isRequired,
};