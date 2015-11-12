import React from 'react';

export default class SpacerNote extends React.Component {


    render() {

        return (
            <div className="spacer-note">
            </div>
        )
    }
}

SpacerNote.propertyTypes = {
    height: React.PropTypes.number.isRequired
};
