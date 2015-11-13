import React from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import DndSrc from './dndsrc';
import DndTar from './dndtar';

import BlueNote from './dnd-list/blue-note';
import RedNote from './dnd-list/red-note';
import GreenNote from './dnd-list/green-note';

import NotesList from './dnd-list/notes-list';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notes: [
                {id: 23, type: "TEXT_NOTE", title: "Meeting", text: "At home in saturday"},
                {id: 11, type: "NUMBER_NOTE", title: "Counter", number: 12},
                {id: 2, type: "TEXT_NOTE", title: "Shopping", text: "Buy onion"},
                {id: 9999, type: "SPACER_NOTE"},
                {id: 45, type: "DATE_NOTE", title: "Visit", date: new Date()},
                {id: 18, type: "NUMBER_NOTE", title: "Days to Christmas", number: 34},
                {id: 36, type: "TEXT_NOTE", title: "Game", text: "Witcher 3"}
            ]
        }
    }

    onEvent(ev){
        console.log("app on event: "+ev.id);
        this.setState({notes: this.state.notes.filter((note) => note.id!=ev.id)})
    }

    render() {

        return (
            <div className="app">
                <NotesList notes={this.state.notes} onEvent={this.onEvent.bind(this)}/>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
