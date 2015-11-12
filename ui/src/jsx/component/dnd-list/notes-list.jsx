import React from 'react';

import BlueNote from './blue-note';
import RedNote from './red-note';
import GreenNote from './green-note';
import SpacerNote from './spacer-note';

import NotePlaceholder from './note-placeholder';

export default class NotesList extends React.Component {

    onEvent(ev){
        if(this.props.onEvent){
            this.props.onEvent(ev)
        }
    }

    _createNotes(list) {

        console.log("create");

        return list.map((note, index) => {
            if (note.type == "TEXT_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <RedNote title={note.title} text={note.text}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "NUMBER_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <BlueNote title={note.title} number={note.number}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "DATE_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <GreenNote title={note.title} date={note.date.toString()}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "SPACER_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <SpacerNote/>
                    </NotePlaceholder>
                )
            }
        })
    }

    render() {

        return (
            <div className="notes-list">
                {this._createNotes(this.props.notes)}
            </div>
        )
    }
}
