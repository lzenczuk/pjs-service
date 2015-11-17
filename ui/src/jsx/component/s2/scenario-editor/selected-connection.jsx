import React from 'react';
import ScenarioEvent from '../scenario-low-level-event'

export default class SelectedConnection extends React.Component {

    constructor(props){
        super(props);
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


        var stroke = "red";
        var strokeWidth = "3";

        return (
            <svg style={style} width={width} height={height}>
                <path
                    d={dString}
                    style={pte}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    fill="none"
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
SelectedConnection.propertyTypes = {
    model: React.PropTypes.object
};