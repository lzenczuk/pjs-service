import React from 'react';
import DndActions from '../../action/dnd-actions'

export default class DndButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {mouseDown: false}
    }

    mouseDownHandler(event){
        this.setState({mouseDown: true})
    }

    mouseMoveHandler(event){
        if(this.state.mouseDown){
            this.setState({mouseDown: false});
            DndActions.instance().drag(this.props.onDrag())
        }
    }

    render(){

        return(
            <div className="button" onMouseMove={this.mouseMoveHandler.bind(this)} onMouseDown={this.mouseDownHandler.bind(this)}>
                {this.props.text}
            </div>
        )
    }
}
