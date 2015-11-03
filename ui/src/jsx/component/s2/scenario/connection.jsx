import React from 'react';

export default class Connection extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0}

    render() {

        var m = this.props.model;

        var cx = Math.abs(m.srcX - m.desX) / 2;

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
            left: left + 'px'
        };

        var pte = {
            pointerEvents: "all"
        };


        return (
            <svg style={style} width={width} height={height}>
                <path d={dString} style={pte} stroke="grey" strokeWidth="3" fill="none"/>
            </svg>
        )

    }
}
