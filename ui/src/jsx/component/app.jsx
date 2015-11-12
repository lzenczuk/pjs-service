import React from 'react';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import DndSrc from './dndsrc';
import DndTar from './dndtar';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="app">
                <DndSrc />
                <DndTar />
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App);
