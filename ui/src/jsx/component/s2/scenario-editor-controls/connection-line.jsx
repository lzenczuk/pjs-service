import React from 'react';

export default class ConnectionLine extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, sy: 75, desX: 0, dy: 0}

    render(){

        var m = this.props.model

        var width = Math.abs(m.sx-m.dx)
        var height = Math.abs(m.sy-m.dy)
        
        var top = m.sy;
        var y1 = 0;
        var y2 = height;

        if(m.sy>m.dy){
            top = m.dy
            y1 = height;
            y2 = 0;
        }

        var left = m.sx;
        var x1 = 0;
        var x2 = width;

        if(m.sx>m.dx){
            left = m.dx;
            x1 = width;
            x2 = 0;
        }


        var style = {
            position: 'absolute',
            top: top+'px',
            left: left+'px',
            pointerEvents: 'none'
        };

        var lineStyle = {
            stroke: 'rgb(255,0,0)',
            strokeWidth: 2
        };

        return(
            <svg style={style} width={width} height={height}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} style={lineStyle} />
            </svg>
        )
    }
}