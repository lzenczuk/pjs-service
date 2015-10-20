import React from 'react';

export default class Connection extends React.Component {

    // model: {src: node.name, des: s.nodeName, srcX: node.x+index*70-35, srcY: 75, desX: 0, desY: 0}

    render(){

        var m = this.props.model

        var width = Math.abs(m.srcX-m.desX)
        var height = Math.abs(m.srcY-m.desY)
        
        var top = m.srcY;
        var y1 = 0;
        var y2 = height;

        if(m.srcY>m.desY){
            top = m.desY
            y1 = height;
            y2 = 0;
        }

        var left = m.srcX;
        var x1 = 0;
        var x2 = width;

        if(m.srcX>m.desX){
            left = m.desX;
            x1 = width;
            x2 = 0;
        }


        var style = {
            position: 'absolute',
            top: top+'px',
            left: left+'px',
        }

        var lineStyle = {
            stroke: 'rgb(255,0,0)',
            strokeWidth: 2,
        }

        return(
            <svg style={style} width={width} height={height}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} style={lineStyle} />
            </svg>
        )
    }
}
