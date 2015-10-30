import React from 'react';

export default class Connection extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0}

    render() {

        var m = this.props.model;

        var cy = Math.abs(m.srcY - m.desY) / 2;

        var sx = m.srcX;
        var sy = m.srcY;

        var csx = m.srcX;
        var csy = m.srcY + cy;

        var dx = m.desX;
        var dy = m.desY;

        var cdx = m.desX;
        var cdy = m.desY - cy;

        var mx = Math.min(sx, csx, dx, cdx) - 10;
        var my = Math.min(sy, csy, dy, cdy) - 10;

        var top = my;
        var left = mx;
        var width = Math.abs(sx - dx) + 20;
        var height = Math.abs(Math.max(sy, csy, dy, cdy) - Math.min(sy, csy, dy, cdy)) + 20;

        sx = sx - mx;
        sy = sy - my;
        csx = csx - mx;
        csy = csy - my;

        dx = dx - mx;
        dy = dy - my;
        cdx = cdx - mx;
        cdy = cdy - my;

        var dString = "M" + sx + "," + sy + " C" + csx + "," + csy + " " + cdx + "," + cdy + " " + dx + "," + dy;
        var points = dx + "," + dy + " " + (dx - 5) + "," + (dy - 10) + " " + (dx + 5) + "," + (dy - 10);
        var style = {
            position: 'absolute',
            top: top + 'px',
            left: left + 'px'
        };

        var pte = {
            pointerEvents: "all"
        };


        return (
            <svg style={style} width={width} height={height}>
                <polygon points={points} stroke="none" fill="grey"/>
                <path d={dString} style={pte} stroke="grey" strokeWidth="3" fill="none"/>
            </svg>
        )

    }
}
