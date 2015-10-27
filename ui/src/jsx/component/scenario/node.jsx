import React from 'react';

import Slot from './slot'

export default class Node extends React.Component {

    constructor(props){
        super(props);
        this.state = {over: false}
    }

    _onMouseDown(event){
        event.preventDefault();
        event.stopPropagation();

        if(this.props.onMouseDown!=null){

            var rec = event.target.getBoundingClientRect();
            var node = this.props.model;

            this.props.onMouseDown({
                type: "NODE_MOUSE_DOWN",
                dx: node.x-rec.left,
                dy: node.y-rec.top,
                cdx: event.clientX-rec.left,
                cdy: event.clientY-rec.top,
                name: this.props.model.name})
        }
    }

    _onMouseDownOnSlot(data){

        console.log("Node: Mouse down on slot"+JSON.stringify(data))
    
        if(this.props.onMouseDownOnSlot!=null){

            data.nodeName = this.props.model.name;

            this.props.onMouseDownOnSlot(data)
        }
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

            if(slotsArray.length==1){
                slots.push( <Slot key={0} x={0} y={70} index={0} width={this.props.model.uiWidth} slot={slotsArray[0]} onMouseDown={this._onMouseDownOnSlot.bind(this)}/> )
            }else if(slotsArray.length==2){
                var w = this.props.model.uiWidth/2;
                slots.push( <Slot key={0} x={0} y={70} index={0} width={w} slot={slotsArray[0]} onMouseDown={this._onMouseDownOnSlot.bind(this)}/> );
                slots.push( <Slot key={1} x={w} y={70} index={1} width={w} slot={slotsArray[1]} onMouseDown={this._onMouseDownOnSlot.bind(this)}/> )
            }else{
                slots = slotsArray.map((s, i) => {
                    return (<Slot key={i} x={i*70+35} y={70} index={i} width={70} slot={s} onMouseDown={this._onMouseDownOnSlot.bind(this)}/>)
                })
            }

        }

        return(
            <div className="box" style={style} onMouseDown={this._onMouseDown.bind(this)}>
                <div className="title">{this.props.model.name}</div>
                <div className="script">{this.props.model.description}</div>
                <div>
                    {slots}
                </div>
            </div>
        )
    }
}

