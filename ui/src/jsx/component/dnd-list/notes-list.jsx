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
                        <RedNote id={note.id} title={note.title} text={note.text} onEvent={this.props.onEvent}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "NUMBER_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <BlueNote id={note.id} title={note.title} number={note.number} onEvent={this.props.onEvent}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "DATE_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <GreenNote id={note.id} title={note.title} date={note.date.toString()} onEvent={this.props.onEvent}/>
                    </NotePlaceholder>
                )
            } else if (note.type == "SPACER_NOTE") {
                return (
                    <NotePlaceholder key={index} index={index} onEvent={this.onEvent.bind(this)}>
                        <SpacerNote id={note.id}/>
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
