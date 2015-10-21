import React from 'react';

export default class Connection extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0}

    render(){

        var m = this.props.model;

        var cy = Math.abs(m.srcY-m.desY)/2;

        var sx = m.srcX;
        var sy = m.srcY;

        var csx = m.srcX;
        var csy = m.srcY+cy;

        var dx = m.desX;
        var dy = m.desY;

        var cdx = m.desX;
        var cdy = m.desY-cy;

        var mx=Math.min(sx, csx, dx, cdx);
        var my=Math.min(sy, csy, dy, cdy);

        var top = my;
        var left = mx;
        var width = Math.abs(sx-dx);
        var height = Math.abs(Math.max(sy, csy, dy, cdy)-Math.min(sy, csy, dy, cdy));

        sx = sx - mx;
        sy = sy - my;
        csx = csx - mx;
        csy = csy - my;

        dx = dx - mx;
        dy = dy - my;
        cdx = cdx - mx;
        cdy = cdy - my;

        var dString = "M"+sx+","+sy+" C"+csx+","+csy+" "+cdx+","+cdy+" "+dx+","+dy

        var style = {
            position: 'absolute',
            top: top+'px',
            left: left+'px'
        };

        return(
            <svg style={style} width={width} height={height}>
                <g fill="none" stroke="red" stroke-width="10">
                <path d={dString} />
                </g>
            </svg>
        )
    }
}
