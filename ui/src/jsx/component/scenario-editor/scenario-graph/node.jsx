import React from 'react';
import classNames from 'classnames';
import ScenarioLowLevelEvent from '../scenario-low-level-event'

import Slot from './slot'


export default class Node extends React.Component {

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioLowLevelEvent.nodeMouseDownEvent(event.clientX, event.clientY, this.props.model.id));
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioLowLevelEvent.nodeMouseUpEvent(event.clientX, event.clientY, this.props.model.id));
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

        if(width!=this.props.model.width || height!=this.props.model.height || totalCh!=this.props.model.contentHeight){
            return {nodeId: this.props.model.id, width: width, height: height, contentHeight: totalCh}
        }else{
            return null;
        }
    }

    render(){

        var numberOfSlots = 0;
        if(this.props.model.slots.slots!=null){
            numberOfSlots = this.props.model.slots.slots.length
        }

        var style = {
            top: this.props.model.y,
            left: this.props.model.x,
            width: this.props.model.width,
            height: this.props.model.height
        };

        var slots = this.props.model.slots.slots.map((slot, index) =>
            <Slot key={this.props.model.id+index}
                  label={slot.label}
                  index={index}
                  nodeId={this.props.model.id}
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
                    <div className="title">{this.props.model.name}</div>
                    <div className="description">{this.props.model.description}</div>
                </div>
                <div ref="slots">
                    {slots}
                </div>
            </div>
        )
    }
}

Node.propertyTypes = {
    model: React.PropTypes.object,
	onMouseEvent: React.PropTypes.func
};

