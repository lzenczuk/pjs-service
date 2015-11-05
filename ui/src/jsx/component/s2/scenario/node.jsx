import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

import Slot from './slot'


export default class Node extends React.Component {

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.nodeMouseDownEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.nodeMouseUpEvent(event.clientX, event.clientY, this.props.name));
        }
    }

    checkIsElementSizeCorrect(){
        let cw = this.refs['content'].offsetWidth;

        let ch = this.refs['content'].offsetHeight;
        let cmt = parseInt(getComputedStyle(this.refs['content']).marginTop);
        let cmb = parseInt(getComputedStyle(this.refs['content']).marginBottom);

        let totalCh = ch+cmt+cmb;

        let sw = this.refs['slots'].offsetWidth;
        let sh = this.refs['slots'].offsetHeight;

        let width = Math.max(cw, sw);
        let height = totalCh+sh;

        if(width!=this.props.width || height!=this.props.height || totalCh!=this.props.contentHeight){
            return {nodeName: this.props.name, width: width, height: height, contentHeight: totalCh}
        }else{
            return null;
        }
    }

    render(){

        var numberOfSlots = 0;
        if(this.props.slots!=null){
            numberOfSlots = this.props.slots.length
        }

        var style = {
            top: this.props.y,
            left: this.props.x,
            width: this.props.width,
            height: this.props.height
        };

        var slots = this.props.slots.map((slot, index) =>
            <Slot key={this.props.name+index}
                  label={slot.label}
                  index={index}
                  nodeName={this.props.name}
                  onMouseEvent={this.props.onMouseEvent}
            />
        );

        return(
            <div className="box"
                 style={style}
                 onMouseDown={this._onMouseDown.bind(this)}
                 onMouseUp={this._onMouseUp.bind(this)}
            >
                <div className="content" ref="content">
                    <div className="title">{this.props.name}</div>
                    <div className="script">{this.props.description}</div>
                </div>
                <div ref="slots">
                    {slots}
                </div>
            </div>
        )
    }
}

Node.propertyTypes = {
	name: React.PropTypes.string.isRequired,
	description: React.PropTypes.string.isRequired,
	x: React.PropTypes.number.isRequired,
	y: React.PropTypes.number.isRequired,
	width: React.PropTypes.number.isRequired,
	height: React.PropTypes.number.isRequired,
    contentHeight: React.PropTypes.number.isRequired,
	slots: React.PropTypes.array.isRequired,
	onMouseEvent: React.PropTypes.func
};

