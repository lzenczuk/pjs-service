import React from 'react';
import ScenarioMouseEvent from './scenario-mouse-event'

export default class Connection extends React.Component {

    constructor(props){
        super(props);

        this.state = {over: false}
    }

    _onMouseDown(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            let connectionMouseDownEvent = ScenarioMouseEvent.connectionMouseDownEvent(
                event.clientX,
                event.clientY,
                this.props.model.src,
                this.props.model.des,
                this.props.model.connectionId
            );

            this.props.onMouseEvent(connectionMouseDownEvent);
        }
    }

    _onMouseUp(event){
        if(this.props.onMouseEvent!=null){
            event.preventDefault();
            event.stopPropagation();

            this.props.onMouseEvent(ScenarioMouseEvent.connectionMouseUpEvent(
                event.clientX,
                event.clientY,
                this.props.model.src,
                this.props.model.des,
                this.props.model.connectionId
            ));
        }
    }

    render() {

        var m = this.props.model;

        var cx = Math.max((Math.abs(m.srcX - m.desX) / 2), 30);

        var sx = m.srcX;
        var sy = m.srcY;

        var csx = m.srcX + cx;
        var csy = m.srcY;

        var dx = m.desX;
        var dy = m.desY;

        var cdx = m.desX - cx;
        var cdy = m.desY;

        var mx = Math.min(sx, csx, dx, cdx) - 10;
        var my = Math.min(sy, csy, dy, cdy) - 10;

        var top = my;
        var left = mx;
        var height = Math.abs(sy - dy) + 20;
        var width = Math.abs(Math.max(sx, csx, dx, cdx) - Math.min(sx, csx, dx, cdx)) + 20;

        sx = sx - mx;
        sy = sy - my;
        csx = csx - mx;
        csy = csy - my;

        dx = dx - mx;
        dy = dy - my;
        cdx = cdx - mx;
        cdy = cdy - my;

        var dString = "M" + sx + "," + sy + " C" + csx + "," + csy + " " + cdx + "," + cdy + " " + dx + "," + dy;

        var style = {
            position: 'absolute',
            top: top + 'px',
            left: left + 'px',
            pointerEvents: "none"
        };

        var pte = {
            pointerEvents: "visibleStroke"
        };


        var stroke = "grey";
        var strokeWidth = "3";

        if(this.state.over){
            stroke = "black";
        }

        if(this.props.selected){
            strokeWidth = '3';
            stroke = "red";
        }

        var over = function(event){
            this.setState({over: true})
        }.bind(this);

        var out = function(event){
            this.setState({over: false})
        }.bind(this);


        return (
            <svg style={style} width={width} height={height}>
                <path
                    d={dString}
                    style={pte}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
                    onMouseOver={over}
                    onMouseOut={out}
                    onMouseDown={this._onMouseDown.bind(this)}
                    onMouseUp={this._onMouseUp.bind(this)}
                />
            </svg>
        )

    }
}

/*
 src: React.PropTypes.string.isRequired,
 index: React.PropTypes.number.isRequired,
 des: React.PropTypes.string.isRequired,
 srcX: React.PropTypes.number.isRequired,
 srcY: React.PropTypes.number.isRequired,
 desX: React.PropTypes.number.isRequired,
 desY: React.PropTypes.number.isRequired,
 */
Connection.propertyTypes = {
    onMouseEvent: React.PropTypes.func
};