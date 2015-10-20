import React from 'react';

import Slot from './slot'

export default class Node extends React.Component {

    constructor(props){
        super(props);
        this.state = {over: false}
    }

    mouseEnter(event){
        this.setState({over: true})
    }

    mouseLeave(event){
        this.setState({over: false})
    }

    render(){

        var style = {
            top: this.props.model.y+"px",
            left: this.props.model.x+"px",
            width: 210+"px"
        };

        if(this.state.over) style.backgroundColor = '#88f';

        var slots=[];

        if(this.props.model.slots!=null){

            var slotsArray = this.props.model.slots.slots;

            if(slotsArray.length>3){
                style.width=70*slotsArray.length+"px"
            }

            slots = slotsArray.map((s, i) => {
                return (<Slot x={i*70} y={70} slot={s}/>)
            })
        }

        return(
            <div className="box" style={style} onMouseEnter={this.mouseEnter.bind(this)} onMouseLeave={this.mouseLeave.bind(this)}>
                <div className="title">{this.props.model.name}</div>
                <div className="script">{this.props.model.description}</div>
                <div>
                    {slots}
                </div>
            </div>
        )
    }
}

